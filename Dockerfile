FROM node:alpine

LABEL maintainer="XiaoMuCOOL <gavin@bingblue.com>"

COPY index.js /

COPY package.json /package.json

RUN npm install

ENTRYPOINT ["node", "/index.js"]
