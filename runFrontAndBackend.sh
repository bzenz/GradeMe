#!/bin/bash

(
trap 'exit 0' SIGINT; 
cd ./BackEnd
echo starting Backend...
npm start &
cd ../FrontEnd
echo starting Frontend...
npm run web
)
