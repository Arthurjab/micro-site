#!/bin/sh

npm install -g gulp
npm install -g protractor
npm install
./node_modules/protractor/bin/webdriver-manager update
bower install

gulp production

echo "Install Done !"
