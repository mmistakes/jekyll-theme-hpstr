FROM ruby:2.1

MAINTAINER Maxence POUTORD <maxence.poutord@gmail.com>

RUN apt-get update

# Install bundle of gems
WORKDIR /tmp
COPY Gemfile /tmp/
RUN bundle install

# Copy site into
VOLUME /site
WORKDIR /site
COPY . /site

EXPOSE 4000

ENTRYPOINT ["jekyll", "serve"]
