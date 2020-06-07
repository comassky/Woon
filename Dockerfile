FROM node:current-alpine AS build
RUN apk update
RUN apk add git
RUN git clone https://github.com/comassky/Woon.git
WORKDIR /Woon
RUN yarn install
RUN yarn build


FROM nginx:alpine
COPY --from=build /Woon/dist /usr/share/nginx/html 
