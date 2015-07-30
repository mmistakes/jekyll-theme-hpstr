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

I'm going to assume you already have a basic understanding of running Django on Heroku and that you're using the new Cedar-14 stack.
First of all , let's introduce the players:

###Nginx

Nginx is a web server, but most widely used as a reverse proxy.
I'm using the [https://github.com/beanieboi/nginx-buildpack.git](https://github.com/beanieboi/nginx-buildpack.git) buildpack cause it uses the newer 1.8.0 stable version of nginx, but you can use the original [buildpack](https://github.com/ryandotsmith/nginx-buildpack) by @ryandotsmith.
Why do I use it on Heroku? I've been testing our applications for quite some by flooding them using tools like [Blitz](https://www.blitz.io/). We use [Gunicorn](http://gunicorn.org/), [uWSGI](http://uwsgi-docs.readthedocs.org/en/latest/) and [Waitress](http://waitress.readthedocs.org/en/latest/) as our wsgi servers and all of them fail if fed with enough long running queries and almost never recover. With Nginx guarding the gates, things will still shut down, but the webservers usually recover after the flood stops.

###PgBouncer
With Django resetting database connections on every request, you quickly run out of precious connections. Add to that a couple of async task queue workers and that connection count goes up fast. PgBouncer is a standalone connection pool for PostgreSQL. Your processes connect to PgBouncer and it, in turn, connects to your database server. Instead of breaking that connection, it's kept around for the next request. You'll see some performance improvement

You actually pay for the maximum connections your PostgreSQL server can handle on Heroku, so there's .
For this I used the [https://github.com/heroku/heroku-buildpack-pgbouncer](https://github.com/heroku/heroku-buildpack-pgbouncer) buildpack by @gregburek, although it's a slightly older version of pgbouncer, it is actively maintained and has the added benefit of using stunnel to connect to your database over SSL.

###Heroku
My favorite PaaS. You will hear people complain about how they can do it cheaper and easier with their own stacks, but the fact is that it's been a time and money saver for us.
I spend near zero time on server maintenance, we've had no real downtime and security issues are always fixed within hours. We are using the new Cedar-14 stack, based on Ubuntu LTS 14.04.
Since the older stacks are deprecated everything in this article works under the assumption that you too are running Cedar-14.
You'll need the [Heroku Toolbelt](https://toolbelt.heroku.com/) to configure the buildpacks, so go ahead and install it if you haven't already.

### Using buildpacks

Originally Heroku only supported a single buildpack for you dynos which had to be set through the xxx configuration setting.
Then came @ddollar with his multipack, that allowed for extra buildpacks to be loaded through a `.buildpacks` file which you had to add to your project.
Heroku seems to have extended the `buildpacks` command so it's no longer neccesary to hack it like that:

{% highlight bash %}
Usage: heroku buildpacks

 display the buildpack_url(s) for an app

Examples:

 $ heroku buildpacks
 https://github.com/heroku/heroku-buildpack-ruby

Additional commands, type "heroku help COMMAND" for more details:

  buildpacks:add BUILDPACK_URL       #  add new app buildpack, inserting into list of buildpacks if neccessary
  buildpacks:clear                   #  clear all buildpacks set on the app
  buildpacks:remove [BUILDPACK_URL]  #  remove a buildpack set on the app
  buildpacks:set BUILDPACK_URL       #  set new app buildpack, overwriting into list of buildpacks if neccessary

{% endhighlight %}

Let's go ahead and add the Nginx buildpack.

{% highlight bash %}
$ heroku buildpacks:add https://github.com/beanieboi/nginx-buildpack.git
Buildpack added. Next release on myproject will use https://github.com/beanieboi/nginx-buildpack.git.
Run `git push heroku master` to create a new release using this buildpack.

{% endhighlight %}

Then the PgBouncer buildpack:

{% highlight bash %}
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-pgbouncer.git
Buildpack added. Next release on myproject will use:
  1. https://github.com/beanieboi/nginx-buildpack.git
  2. https://github.com/heroku/heroku-buildpack-pgbouncer.git
Run `git push heroku master` to create a new release using these buildpacks.
{% endhighlight %}

That worked out well and is a lot easier than the old way of doing things.
Now we only have to add a Python buildpack. Normally Heroku does this automatically based on your project files, but we've
overridden this behavior with our custom buildpacks.

{% highlight bash %}
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-python.git
Buildpack added. Next release on myproject will use:
  1. https://github.com/beanieboi/nginx-buildpack.git
  2. https://github.com/heroku/heroku-buildpack-pgbouncer.git
  3. https://github.com/heroku/heroku-buildpack-python.git
Run `git push heroku master` to create a new release using these buildpacks.
{% endhighlight %}

That's it for the buildpacks. Now let's have a look at how they work and configure the `Procfile`

### Buildpack concepts
The buildpack's authors have already taken care of the configuration of Nginx so you won't have to do it.
You change things around using the Ruby instructions in the [repository](https://github.com/beanieboi/nginx-buildpack),
but I've found the default configuration to be working fine as is. It uses three basic concepts:

* It starts with a shell script `bin/start-nginx`.
* It creates a unix socket `/tmp/nginx.socket` for your wsgi server.
* It doesn't accept requests until the file `/tmp/app-initialized` has been found.

Similarly the PgBouncer buildpack has many configuration options using `heroku config`.
The most useful is probably the `PGBOUNCER_MAX_CLIENT_CONN` setting, which I'm setting to our database servers plan maximum:
{% highlight bash %}
heroku config:set PGBOUNCER_MAX_CLIENT_CONN=120
{% endhighlight %}
You can check out all the other options at the [repository](https://github.com/heroku/heroku-buildpack-pgbouncer).
For it to work with your webserver and database, the buildpack uses these concepts:

* It starts with a shell script `bin/start-pgbouncer-stunnel`
* It will use the database connection set in your Heroku's `DATABASE_URL`
* On start it will replace `DATABASE_URL` with it's own connection information.

This means you don't have to change your Django database configuration as long as you were using the `DATABASE_URL` environment value or the [dj-database-url](https://github.com/kennethreitz/dj-database-url) package.
I did run in some small problems with this though. Since it only does the old switcheroo once, any web workers that start before that will not have the new connection to PgBouncer.
The same problem comes up when your web workers spawn from an environment other than the one that had its configuration updated.

### Procfile


#### Gunicorn

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
env = DJANGO_SETTINGS_MODULE=MyProject.settings
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
