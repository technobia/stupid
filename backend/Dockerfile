FROM node:4.4.7

ARG SOURCES_MIRROR=""
RUN if [ ! -z "${SOURCES_MIRROR}" ]; then echo "$SOURCES_MIRROR" > /etc/apt/sources.list ; fi
RUN apt-get update && apt-get -y install mysql-client && rm -rf /var/lib/apt/lists/*

ARG NPM_CONFIG_REGISTRY=""

WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD typings.json /app/typings.json
RUN npm run typings

ENV NODE_ENV production
ENV DEBUG false
EXPOSE 3333
CMD npm start

ADD . /app
RUN npm run compile && npm test
