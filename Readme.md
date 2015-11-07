# Art Generation Block Chain Hackathon Project - Glitch-chain

# Glitch-chain

## Art Generation Block Chain Hackathon Project

### Site flow

#### View images

* User visits site.
* bitcoinjs-lib pulls last X transactions to sites bitcoin address
* Discard any transactions without OP_RETURN value or with
* OP_RETURN value that are not valid parameters to gitch function.
* Browser renders X instances of image using glitch parameters

#### Create image on site

* User generates glitch are in browser.
* User likes a particular image and want to save.
* bitcoin-js lib creates raw transaction with params in OP_RETURN
* send tx to site bitcoin address with glitch parameters in OP_RETURN.

#### Create image off site

* User crafts raw transaction including glitch parameters in OP_RETURN
* receive address is site bitcoin address
* User sends transaction
