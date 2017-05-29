#!/usr/bin/env bash

set -xeuo pipefail

/etc/nginx/proxy/configure.sh

nginx -g 'daemon off;'
