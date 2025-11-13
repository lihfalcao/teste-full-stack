FROM php:7.2-apache

# Corrigir repositórios Debian antigos
RUN sed -i 's|deb.debian.org|archive.debian.org|g' /etc/apt/sources.list && \
    sed -i 's|security.debian.org|archive.debian.org|g' /etc/apt/sources.list && \
    echo "Acquire::Check-Valid-Until false;" > /etc/apt/apt.conf.d/99ignore-release-date

# Instalar dependências e extensões
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libjpeg-dev libfreetype6-dev libicu-dev g++ \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd mbstring intl pdo_mysql zip opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer 1.x (compatível com Laravel 5.x)
RUN curl -sS https://getcomposer.org/installer | php -- --version=1.10.26 --install-dir=/usr/local/bin --filename=composer

# Copiar app e vhost
WORKDIR /var/www/html
COPY . /var/www/html
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Permissões
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html/storage

EXPOSE 80
CMD ["apache2-foreground"]
