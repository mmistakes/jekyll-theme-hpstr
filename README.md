# Emer's blog instructions

# Docker
Tested on Windows 10 using PowerShell. Docker version 18.06.0-ce

## Build Github Pages Docker image
Latests github-pages gem
```
git clone https://github.com/github/pages-gem.git
docker build -t gh-pages .
```

## Serve using Docker-compose
```
docker-compose up
```
close down with Ctrl+C and `docker-compose down`

Equivalent manual command
```
 docker run --rm -p 4000:4000 -e "JEKYLL_ENV=docker" -v ${PWD}:/src/site gh-pages jekyll serve --config _config.yml,_config_docker.yml -H 0.0.0.0 -P 4000 --watch --force_polling
```
make sure the container is stopped with `docker stop $(docker ps -q)`

## WSL (to be reviewed)
sudo apt install ruby ruby-dev ruby-bundle make gcc g++ zlib1g-dev
git clone https://github.com/github/pages-gem.git
cd pages-gem
bundle install 

```
  300  bundle exec jekyll serve
  301  bundle update
  302  bundle install
  303  bundle update
  304  bundle exec jekyll serve
  305  ls
  306  git status
  307  bundle exec jekyll serve
  308  git status
```