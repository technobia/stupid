#!/usr/bin/env bash

set -euo pipefail

docker kill $(docker ps -a | grep ehs | awk '{print $1}') || true
docker rm -f $(docker ps -a | grep ehs | awk '{print $1}') || true
docker volume rm $(docker volume ls | grep ehs | awk '{print $2}') || true
docker network rm $(docker network ls | grep ehs | awk '{print $1}') || true