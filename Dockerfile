FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json

RUN yarn install

EXPOSE 3000
