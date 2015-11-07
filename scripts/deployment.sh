#!/bin/sh

DEPLOYMENT_PATH="/srv/glitch-chain/"

GIT_WORK_TREE="$DEPLOYMENT_PATH"
unset GIT_DIR


cd $DEPLOYMENT_PATH
#git checkout production
env -i git pull 


# re-execute NPM to refresh dependencies

cd "$DEPLOYMENT_PATH"\server
npm install

# should be good now
git update-server-info