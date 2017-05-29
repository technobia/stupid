FROM node:4.4.7

ARG NPM_CONFIG_REGISTRY=""
ARG PHANTOMJS_CDNURL=""

RUN npm install -g phantomjs-prebuilt@2.1.7
ENV PHANTOMJS_BIN phantomjs

ARG SASS_BINARY_SITE=""

WORKDIR /app

COPY package.json /app/
RUN npm install

ARG VALIDATE=0
CMD tar -czf - build assets json index.html

COPY . /app

RUN npm run build \
    && if [ $VALIDATE -eq 1 ] ; then npm test ; fi