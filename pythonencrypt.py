from Crypto.Cipher import AES
from hashlib import md5
import base64


BLOCK_SIZE = 16

def pad (data):
    data = ' '*BLOCK_SIZE + data
    pad = BLOCK_SIZE - len(data) % BLOCK_SIZE
    return data + pad * chr(pad)

def unpad (padded):
    pad = ord(chr(padded[-1]))
    return padded[BLOCK_SIZE:-pad]

def get_aes (password):
    m = md5()
    m.update(password.encode('utf-8'))
    key = m.hexdigest()

    m = md5()
    m.update((password*2).encode('utf-8'))
    iv = m.hexdigest()
    
    return AES.new(key, AES.MODE_CBC, iv[:BLOCK_SIZE])
    

def _encrypt(password,data):
    data = pad(data)
    aes = get_aes(password)

    encrypted = aes.encrypt(data)
    return base64.urlsafe_b64encode(encrypted).decode('utf-8')
    

def _decrypt(password,edata):
    edata = base64.urlsafe_b64decode(edata)
    aes = get_aes(password)
    
    return unpad(aes.decrypt(edata)).decode('utf-8')

