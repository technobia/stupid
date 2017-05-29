#!/usr/bin/env bash

set -xeuo pipefail

source ci/backend.source

build_backend

docker tag ${BACKEND_IMAGE}:latest ${BACKEND_IMAGE}:${TAG}
docker push ${BACKEND_IMAGE}:${TAG}

