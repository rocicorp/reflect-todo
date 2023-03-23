#!/bin/bash

VENDOR="$(pwd)/vendor"
cd ../mono
[[ $1 == "pull" ]] && git stash -u && git pull && git stash pop
npm install
echo "Building and packaging reflect"
npm run build --prefix ./packages/reflect
npm pack --workspace ./packages/reflect --pack-destination $VENDOR
REFLECT_V=$(npm pkg get version --prefix ./packages/reflect | sed 's/"//g')
echo "Building and packaging reflect"
npm run build --prefix ./packages/reflect
npm pack --workspace ./packages/reflect-server --pack-destination $VENDOR
REFLECT_SERVER_V=$(npm pkg get version --prefix ./packages/reflect-server | sed 's/"//g')
cd -

echo "updating packages"
echo "@rocicorp/reflect $REFLECT_V"
echo "@rocicorp/reflect-server $REFLECT_SERVER_V"

npm pkg set dependencies.@rocicorp/reflect="./vendor/rocicorp-reflect-$REFLECT_V.tgz"
npm pkg set dependencies.@rocicorp/reflect-server="./vendor/rocicorp-reflect-server-$REFLECT_SERVER_V.tgz"
npm install
