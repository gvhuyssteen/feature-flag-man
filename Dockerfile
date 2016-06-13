FROM node:wheezy

MAINTAINER Gerrit van Huyssteen <gerrit@brazenhill.com>

COPY . /code
WORKDIR /code

RUN npm install --production

EXPOSE 8080

CMD [ "npm", "start"]