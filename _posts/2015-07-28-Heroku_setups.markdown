---
layout: post
title: Heroku, Django, Nginx and PgBouncer
modified:
categories:
description: My struggle to get Heroku to work with Nginx and PgBouncer
tags: [heroku, django, nginx, pgbouncer, django q]
image:
  feature: sunset_2.jpg
  credit: koed00
  creditlink:
comments:
share: true
date: 2015-07-28T11:33:41+02:00
---

I've been struggling all weekend to get our [Heroku](https://www.heroku.com) servers set up with [Nginx](http://nginx.org/) and [PgBouncer](https://pgbouncer.github.io/). The simple part was finding out about Heroku buildpacks, with which you can add extra software to your dynos. The hard part, for me, was that most information on the Internet about using buildpacks seems to be outdated. Time to blog about it.

First of all , let's introduce the players:

###Nginx

Nginx is a web server, but most widely used as a reverse proxy.
I'm using the [https://github.com/beanieboi/nginx-buildpack.git](https://github.com/beanieboi/nginx-buildpack.git) buildpack cause it uses the newer 1.8.0 stable version of nginx, but you can use the original [buildpack](https://github.com/ryandotsmith/nginx-buildpack) by @ryandotsmith.
Why do I use it on Heroku? I've been testing our applications for quite some by flooding them using tools like [Blitz](https://www.blitz.io/). We use [Gunicorn](http://gunicorn.org/), [uWSGI](http://uwsgi-docs.readthedocs.org/en/latest/) and [Waitress](http://waitress.readthedocs.org/en/latest/) as our wsgi servers and all of them fail if fed with enough long running queries and almost never recover. With Nginx guarding the gates, things will still shut down, but the webservers usually recover after the flood stops.

###PgBouncer
With Django resetting database connections on every request, you quickly run out of precious connections. Add to that a couple of async task queue workers and that connection count goes up fast. PgBouncer is a standalone connection pool for PostgreSQL. Your processes connect to PgBouncer and it, in turn, connects to your database server. Instead of breaking that connection, it's kept around for the next request. You'll see some performance improvement

You actually pay for the maximum connections your PostgreSQL server can handle on Heroku, so there's .
For this I used the [https://github.com/heroku/heroku-buildpack-pgbouncer](https://github.com/heroku/heroku-buildpack-pgbouncer) buildpack by @gregburek, although it's a slightly older version of pgbouncer, it is actively maintained.

###Heroku
My favorite PaaS. You will hear people complain about how they can do it cheaper and easier with their own stacks, but the fact is that it's been a time and money saver for us.
I spend near zero time on server maintenance, we've had no real downtime and security issues are always fixed within hours. We are using the new Cedar-14 stack, based on Ubuntu LTS 14.04.
Since the older stacks are deprecated everything in this article works under the assumption that you too are running Cedar-14.
You'll need the [Heroku Toolbelt](https://toolbelt.heroku.com/) to configure the buildpacks, so go ahead and install it if you haven't already.

### Buildpacks

The


~~~ bash
$ heroku buildpacks
=== MyProject Buildpack URLs
1. https://github.com/heroku/heroku-buildpack-python.git
2. https://github.com/beanieboi/nginx-buildpack.git
3. https://github.com/heroku/heroku-buildpack-pgbouncer.git

~~~

### Gunicorn

{% highlight bash %}
# Heroku with nginx, pgbouncer, gunicorn and django-q
web: bin/start-nginx bin/start-pgbouncer-stunnel gunicorn -c gunicorn.conf MyProject.wsgi:application
worker: bin/start-pgbouncer-stunnel python manage.py qcluster
{% endhighlight %}

{% highlight python %}
# gunicorn.conf
def when_ready(server):
    # touch app-initialized when ready
    open('/tmp/app-initialized', 'w').close()

bind = 'unix:///tmp/nginx.socket'
workers = 4
{% endhighlight %}

### uWSGI

{% highlight cfg %}
[uwsgi]
http-socket = /tmp/nginx.socket
master = true
processes = 4
die-on-term = true
memory-report = true
enable-threads = true
hook-accepting1 = exec:touch /tmp/app-initialized
env = DJANGO_SETTINGS_MODULE=BizzTracker.settings
module = MyProject.wsgi:application
{% endhighlight %}

### Waitress
{% highlight bash %}
# Heroku with nginx, pgbouncer, waitress and django-q
web: bin/start-nginx bin/start-pgbouncer-stunnel python run.py
worker: bin/start-pgbouncer-stunnel python manage.py qcluster
{% endhighlight %}

{% highlight python %}
# run.py
from waitress import serve
from MyProject import wsgi

# touch app-initialized
open('/tmp/app-initialized', 'w').close()
# start waitress
serve(wsgi.application, unix_socket='///tmp/nginx.socket')
{% endhighlight %}
