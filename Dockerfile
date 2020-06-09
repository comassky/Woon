FROM node:current-alpine AS build
RUN apk update
RUN apk add git
RUN git clone https://github.com/comassky/Woon.git
WORKDIR /Woon
RUN yarn install
EXPOSE 8080
ENTRYPOINT ["yarn", "run", "serve"];
