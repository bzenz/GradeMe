#!/bin/bash

(
trap 'exit 0' SIGINT; 
cd ./BackEnd
echo starting Backend...
npm run-script devStart &
cd ../FrontEnd
echo starting Frontend...
npm run web
)
