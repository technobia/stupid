#!/usr/bin/env bash
set -euo pipefail

#go to project root
cd $(dirname $(readlink -f $0))/..

sed -i 's/function (/function(/g' $(find src/ -type f -name '*.js')
sed -i 's/function (/function(/g' $(find test/ -type f -name '*.js')
