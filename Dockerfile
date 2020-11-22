FROM node:alpine

LABEL maintainer="XiaoMuCOOL <gavin@bingblue.com>"

COPY index.js /

COPY package.json /package.json

RUN npm --registry https://registry.npm.taobao.org i

ENTRYPOINT ["node", "/index.js"]
