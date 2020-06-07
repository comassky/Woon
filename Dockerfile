#syntax=docker/dockerfile:experimental
FROM current-alpine AS build
RUN mkdir -p /workspace
WORKDIR /workspace
RUN apk update
RUN apk add git
RUN git clone https://github.com/comassky/Woon.git
WORKDIR /roon-web
RUN --mount=type=cache,target=/root/.m2 yarn install
RUN yarn build


FROM nginx:alpine
COPY --from=build /workspace/target/* /usr/share/nginx/html