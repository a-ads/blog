FROM node:8-alpine
MAINTAINER bn0ir <gblacknoir@gmail.com>

RUN apk --update --no-cache add libpng-dev \
    && apk add --update --no-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ \
       vips-dev \
       fftw-dev \
       build-base \
    && rm -rf /var/cache/apk/*

RUN npm install -g yarn gatsby

COPY ./ /data/

RUN cd /data/ \
    && yarn install \
    && gatsby build

FROM alpine:3.8

COPY --from=0 /data/public/ /data/
