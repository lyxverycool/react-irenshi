#FROM nginx:alpine
FROM docker.irenshi.cn/alpine-nginx

MAINTAINER David Wei "david.wei@ihr360.com"


ADD ./etc /etc

# sshd_config file is edited for enable access key and disable access password

ADD  build /opt/weixin/static/

EXPOSE 22

ENTRYPOINT ["/usr/sbin/nginx"]
