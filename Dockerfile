FROM node:current-alpine AS build
RUN apk update
RUN apk add git
RUN git clone https://github.com/comassky/Woon.git
WORKDIR /Woon
RUN yarn install
RUN yarn build

FROM node:current-alpine
COPY --from=build /Woon/dist /Woon
RUN npm install serve -g
EXPOSE 8666
ENTRYPOINT [ "serve", "-p", "8666", "/Woon" ]
