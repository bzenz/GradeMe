FROM node:12.18-alpine as node

WORKDIR /tmp/grademe/workdir

COPY FrontEnd/package*.json ./FrontEnd/
COPY BackEnd/package*.json ./BackEnd/

RUN cd FrontEnd/ && \
    npm install && \
    cd ../BackEnd/ && \
    npm install --only=prod

COPY . .

RUN cd FrontEnd/ && \
    npm run export


FROM node:12.18-alpine

WORKDIR /usr/share/html

COPY --from=node /tmp/grademe/workdir/BackEnd .
COPY --from=node /tmp/grademe/workdir/DB .


EXPOSE 5000

CMD [ "npm", "start", "--prefix", "./BackEnd" ]
