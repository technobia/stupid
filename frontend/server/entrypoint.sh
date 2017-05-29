#!/usr/bin/env bash
set -xeuo pipefail

cp /server/server.conf /etc/nginx/conf.d/default.conf

readonly FILE_PATH="/app/build/$(ls /app/build | grep frontend | grep .js | tail -1)"

sed -i "s/window.EHS_LOOKUP_MODE/'${EHS_LOOKUP_MODE}'/g" ${FILE_PATH}

nginx -g "daemon off;"
