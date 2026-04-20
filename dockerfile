FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    zip unzip git curl libzip-dev && \
    docker-php-ext-install pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Point Apache to Laravel's public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -i 's|/var/www/html|${APACHE_DOCUMENT_ROOT}|g' /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

EXPOSE 80