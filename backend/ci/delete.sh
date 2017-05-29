#!/usr/bin/env bash

set -xeuo pipefail

source ci/backend.source

docker rmi ${BACKEND_IMAGE}:${TAG}
