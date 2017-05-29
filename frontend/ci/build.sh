#!/usr/bin/env bash

set -xeuo pipefail

source ci/frontend.source

build_frontend

docker tag ${FRONTEND_IMAGE}:latest ${FRONTEND_IMAGE}:${TAG}
docker push ${FRONTEND_IMAGE}:${TAG}

