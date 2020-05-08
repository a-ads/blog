FROM node:8-alpine
MAINTAINER bn0ir <gblacknoir@gmail.com>

COPY ./ /data/

RUN apk add --update --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/main/ --virtual .build-deps \
       libpng-dev \
       fftw-dev \
       libimagequant \
       build-base \
    && apk add --update --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community/ --virtual .build-deps-testing \
       vips-dev \
    && cd /data/ \
    && npm install yarn gatsby \
    && node_modules/.bin/yarn install \
    && node_modules/.bin/gatsby build \
    && yarn cache clean \
    && npm cache clean --force \
    && apk del .build-deps .build-deps-testing \
    && rm -rf node_modules/* /var/cache/apk/* /tmp/* /var/tmp/*

FROM alpine:3.8

COPY --from=0 /data/public/ /data/
