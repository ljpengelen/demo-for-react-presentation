FROM node:11

RUN apt-get update \
  && apt-get -y install \
          apt-transport-https \
          apt-utils \
          build-essential \
          curl \
          git-core \
          libssl-dev \
          libreadline-dev \
          libcurl4-openssl-dev \
          libxml2-dev \
          libxslt-dev \
          locales \
          zlib1g \
          zlib1g-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*

# Install Java
RUN echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list.d/backports.list \
  && apt-get update \
  && apt-get install -t jessie-backports -y \
          ca-certificates-java \
          openjdk-8-jre-headless \
  && rm /etc/apt/sources.list.d/backports.list \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*

# Install chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update \
  && apt-get -y install google-chrome-stable \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*
ENV CHROME_BIN /usr/bin/google-chrome-stable

RUN DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales && \
    locale-gen C.UTF-8 && \
    /usr/sbin/update-locale LANG=C.UTF-8
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && locale-gen

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS /dev/null

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
