#!/usr/bin/env bash

set -xeuo pipefail

export ENVIRONMENT="${1:-local}"

if [[ ${ENVIRONMENT} = "local" ]] ; then
    make build TAG=latest
    UP_FLAGS=""
else
    UP_FLAGS="-d"
fi

if [[ ${ENVIRONMENT} = "local" ]] || [[ ${ENVIRONMENT} = "staging" ]] ; then
    FILE_YML="local.yml"
else
    FILE_YML="prod.yml"
fi

cp ./env/${ENVIRONMENT}/compose.properties .env
source .env

readonly DOCKER_COMPOSE="docker-compose -p ehs${ENVIRONMENT} -f base.yml -f ${FILE_YML}"

${DOCKER_COMPOSE} build
${DOCKER_COMPOSE} kill
${DOCKER_COMPOSE} rm -f
${DOCKER_COMPOSE} up ${UP_FLAGS}
