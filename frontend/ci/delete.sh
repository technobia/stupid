#!/usr/bin/env bash

set -xeuo pipefail

source ci/frontend.source

docker rmi ${FRONTEND_IMAGE}:${TAG}
