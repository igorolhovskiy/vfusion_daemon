FROM node:alpine

LABEL maintainer = Igor Olhovskiy <IgorOlhovskiy@gmail.com>

WORKDIR /opt

COPY ./vfusion_daemon/ /opt/
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
 
RUN chmod +x /docker-entrypoint.sh && \
    npm install --quiet

ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]