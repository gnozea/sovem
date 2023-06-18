FROM php:7.4-fpm

ENV APCu_VERSION 5.1.20
ENV APCuBC_VERSION 1.0.4

# Install composer:
COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN pecl install

# Install APCu, redis, ...
RUN pecl install apcu \
    && apt-get install -y openssl pkg-config \
    && pecl uninstall mongodb \
    && docker-php-ext-enable apcu \
    && pecl clear-cache \
    && pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis \
    && pecl install mongodb \
    &&  echo "extension=mongodb.so" > $PHP_INI_DIR/conf.d/mongo.ini


RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY init.sh /

 RUN chmod +x /init.sh

 ENTRYPOINT ["/init.sh"]

#To build => docker build -t huguesbert17/php-fpm-with-apcu-redis:latest .
#To push => docker push huguesbert17/php-fpm-with-apcu-redis:latest
#To update local tag link to docker hub => sudo docker tag huguesbert17/php-fpm-with-apcu-redis huguesbert17/php-fpm-with-apcu-redis:latest
