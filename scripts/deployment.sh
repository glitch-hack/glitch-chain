#!/bin/sh

DEPLOYMENT_PATH=/srv/glitch-chain/

GIT_WORK_TREE=$DEPLOYMENT_PATH

cd $DEPLOYMENT_PATH
git checkout production
git pull 


# re-execute NPM to refresh dependencies

cd server
npm install

# should be good now
