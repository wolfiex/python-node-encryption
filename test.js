/* 
A scratch program to test each of the individual components

*/


console.log('testing')
// 
// var myArgs = process.argv.slice(2);
// 

const yargs = require('yargs');

const argv = yargs
    .option('estr', {
        alias: 's',
        default:undefined,
        description: 'The encrypted data string.',
        type: 'string',
    })

    .option('key', {
        alias: 'k',
        default:undefined,
        description: 'decryption key',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;
    

console.log(argv)

const crypto = require('crypto')
// UPDATE: crypto changed in v0.10
// https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10 
var nodev = process.version.match(/^v(\d+)\.(\d+)/);


function get_crypto(key,encode){
    // Create key from key
    var m = crypto.createHash('md5').update(key)
    var key = m.digest('hex');

    m = crypto.createHash('md5').update(key + key)
    var iv = m.digest('hex').slice(0,16);
    
    return encode? crypto.createCipheriv('aes-256-cbc', key, iv) : crypto.createDecipheriv('aes-256-cbc', key, iv)
    
}


function encrypt (value, key) {

    cipher = get_crypto(key,true)
    
    var data = new Buffer.from(value, 'utf8').toString('binary');

    
    var encrypted;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        encrypted = cipher.update(data, 'binary') + cipher.final('binary');
    } else {
        encrypted = cipher.update(data, 'utf8', 'binary') + cipher.final('binary');
    }

    var encoded = new Buffer.from(encrypted, 'binary').toString('base64');

    return encoded;
};

function decrypt (value, key) {
    // Convert urlsafe base64 to normal base64
    var value = value.replace(/\-/g, '+').replace(/_/g, '/');
    // Convert from base64 to binary string
    var edata = new Buffer.from(value, 'base64').toString('binary')


    try{
    var decipher = get_crypto(key,false);
    var decrypted, textval;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {  
        decrypted = decipher.update(edata, 'binary') + decipher.final('binary');    
        textval = new Buffer.from(decrypted, 'binary').toString('utf8');
    } else {
        textval = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
    }
    
    return textval
}

catch (err){console.log('DECRYPT ERROR:',err.code,)}

};

/////////test

var key = 'well lets not do this';
var value = 'hi you';

encoded = encrypt(value, key);
console.log('encrypt',value,encoded,typeof(encoded),key.length)

console.log('wrongkeytest',decrypt(encoded, key+'a'))
wc = encoded
wc = wc.replace(wc.substring(3,5),"zz")
console.log('wrongcode',decrypt(wc, key),wc)
console.log('correct',decrypt(encoded, key))


