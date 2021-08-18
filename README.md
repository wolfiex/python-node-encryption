# python-node-encryption

The accompanying repository for medium article: 
https://towardsdatascience.com/reading-python-encrypted-data-in-node-js-5b47003dda0

## Dependancies 
Install nodejs:
`conda install nodejs`

Using node install crytpto:
`npm i g crypto yargs`

Finally we also require the relevant python package:
`pip install pycrypto`

## Running the example. 

- Node decryption code is contained within `nodedecrypt.js`

- Python encryption/decrytion code is within `pythonencrypt.py`

- The combined test code is under `communicate.py`. 



To test the code run 
```
python communicate.py
```





