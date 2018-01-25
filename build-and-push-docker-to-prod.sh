#!/bin/bash
#cd web


declare version=$(cat package.json | grep version  | head -1  | awk -F: '{ print $2 }'  | sed 's/[",]//g'  | tr -d '[[:space:]]')
#PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag $PACKAGE_VERSION && git push --tags
echo version

docker build -t docker.irenshi.cn/irenshi-weixin-static .
docker tag docker.irenshi.cn/irenshi-weixin-static docker.ihr360.com/irenshi-weixin-static:$version
docker push docker.ihr360.com/irenshi-weixin-static:$version
