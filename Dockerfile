FROM node:alpine

LABEL maintainer="XiaoMuCOOL <gavin@bingblue.com>"

COPY index.js /

COPY package.json /package.json

RUN npm install -g npm@7.0.13

RUN npm i

ENTRYPOINT ["node", "/index.js"]
