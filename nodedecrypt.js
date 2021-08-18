/* 
A scratch program to test each of the individual components

*/

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
    

const crypto = require('crypto')
var nodev = process.version.match(/^v(\d+)\.(\d+)/);


function decrypt (key,value) {
    // Convert urlsafe base64 to normal base64
    var value = value.replace(/\-/g, '+').replace(/_/g, '/');

    // Convert from base64 to binary string
    var edata = new Buffer.from(value, 'base64').toString('binary')

    // Create key from key
    var m = crypto.createHash('md5').update(key)
    var key = m.digest('hex');

    m = crypto.createHash('md5').update(key + key)
    var iv = m.digest('hex').slice(0,16);

    try{
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    var decrypted = decipher.update(edata, 'binary') + decipher.final('binary');    
    var textval = new Buffer.from(decrypted, 'binary').toString('utf8');

    
    return textval.slice(16)
}

catch (err){console.log('DECRYPT ERROR:',err.code,)}

};

// console.log(argv)

text = decrypt(argv.key,argv.s)
// console.log('The decrypted value is: ',text)
console.log(text)
