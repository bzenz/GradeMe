FROM node:14

WORKDIR /tmp/grademe/workdir

COPY FrontEnd/package*.json ./FrontEnd/
COPY BackEnd/package*.json ./BackEnd/

RUN cd FrontEnd/ && \
    npm install && \
    cd ../BackEnd/ && \
    npm install

COPY . .

RUN cd FrontEnd/ && \
    npm run export


EXPOSE 5000

CMD [ "npm", "start", "--prefix", "./BackEnd" ]
