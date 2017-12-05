FROM mysql:5.7.18

COPY ./mysql-docker.cnf /etc/mysql/conf.d/z99-docker.cnf
COPY ./mydatabase.sql /docker-entrypoint-initdb.d/mydatabase.sql