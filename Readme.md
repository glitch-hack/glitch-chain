# Art Generation Block Chain Hackathon Project - Glitch-chain

# Glitch-chain

## Art Generation Block Chain Hackathon Project

### Site flow

#### View images

* User visits site.
* Script pulls last X transactions to sites bitcoin address
* Discard any transactions without OP_RETURN value or with
* OP_RETURN value that are not valid parameters to gitch function.
* Send these glitch parameters to users browser along with base image.
* Browser renders X instances of image using glitch parameters

#### Create image on site

* User generates glitch are in browser.
* User likes a particular image and want to save.
* Client posts glitch parameters to server
* server sends tx to site bitcoin address with glitch parameters in OP_RETURN.

#### Create image off site

* User crafts raw transaction including glitch parameters in OP_RETURN
* receive address is site bitcoin address
* User sends transaction
