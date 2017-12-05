FROM node:8

RUN apt-get update \
 && apt-get install -y --no-install-recommends libfreetype6 libfontconfig \
 && apt-get clean

RUN mkdir -p /opt/app && cd /opt/app
WORKDIR /opt/app

COPY ./package.json /opt/app/package.json
COPY ./webpack.config.js /opt/app/webpack.config.js
COPY ./.babelrc /opt/app/.babelrc
COPY ./node /opt/app/node
COPY ./public /opt/app/public
COPY ./src /opt/app/src

RUN cd /opt/app && npm install && npm run build

ENV MYSQL_PORT_3306_TCP_ADDR db

EXPOSE 8025

CMD ["npm", "start"]