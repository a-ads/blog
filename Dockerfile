FROM node:lts-bullseye

COPY ./ /data/

WORKDIR /data/

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get --allow-releaseinfo-change update \
    && apt-get -o Dpkg::Options::="--force-confnew" -yV upgrade --with-new-pkgs \
    && apt-get -y install libpng-dev fftw-dev python3-dev libimagequant-dev libvips-dev build-essential python3 \
    && node -v \
    && npm install npm@8.19.3 -g --loglevel verbose \
    && npm install --legacy-peer-deps --loglevel verbose \
    && node_modules/.bin/gatsby clean --verbose \
    && node_modules/.bin/gatsby build --prefix-paths --verbose \
    && npm cache clean --force

FROM node:lts-bullseye-slim

RUN export DEBIAN_FRONTEND=noninteractive \
   && apt-get --allow-releaseinfo-change update \
   && apt-get -o Dpkg::Options::="--force-confnew" -yV upgrade --with-new-pkgs \
   && apt-get -y install awscli

WORKDIR /data/
COPY --from=0 /data/ /data/
