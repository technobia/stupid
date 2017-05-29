#!/usr/bin/env bash

set -xeuo pipefail

cp /etc/nginx/proxy/nginx.conf /etc/nginx/nginx.conf

envsubst '$FRONTEND_HOST $BACKEND_HOST' < /etc/nginx/proxy/tpl/proxy_body.conf.tpl > /etc/nginx/conf.d/proxy_body.conf

if [[ "${HTTPS_OFF:-false}" == "true" ]] ; then
    envsubst '$PORT' < /etc/nginx/proxy/tpl/server_any_port.conf.tpl > /etc/nginx/conf.d/default.conf
else
    envsubst '' < /etc/nginx/proxy/tpl/server_https.conf.tpl > /etc/nginx/conf.d/default.conf
fi

if [[ "${CACHE_OFF:-false}" == "true" ]] ; then
    cp /etc/nginx/proxy/tpl/empty.conf.tpl /etc/nginx/conf.d/proxy_cache.conf
else
    cp /etc/nginx/proxy/tpl/proxy_cache.conf.tpl /etc/nginx/conf.d/proxy_cache.conf
fi
