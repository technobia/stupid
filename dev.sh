#!/usr/bin/env bash

set -xeuo pipefail

export ENVIRONMENT=dev
cp ./env/${ENVIRONMENT}/compose.properties .env

if [ "$(uname)" == "Darwin" ]; then
	export DOCKERHOST_IP="${IP_ALIAS}"
else
    export DOCKERHOST_IP="$(ifconfig $(ip route | head -1 | awk '{ print $5 }') | grep "inet " | awk '{ print $2 }' | awk -F':' '{ print $2 }')"
fi
echo "DOCKERHOST_IP: $DOCKERHOST_IP"

export PORT=${EHEALTHSCANNER_DEV_PORT:-3223}
export MYSQL_PORT=${EHEALTHSCANNER_DB_PORT:-3506}
export DATA_FOLDER=dbdata

# Run
DC="docker-compose -p ehsdev -f base.yml -f dev.yml"

${DC} build
${DC} down || true
${DC} up
