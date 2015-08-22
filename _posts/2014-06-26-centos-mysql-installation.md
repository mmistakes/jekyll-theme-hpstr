---
layout: post
title: "CentOS用yum安装Mysql"
modified: 2014-06-26 14:51:58 +0800
tags: [CentOS, Mysql]
---

###1. 用yum安装mysql

{% highlight bash %}

$ yum -y install mysql mysql-server mysql-devel

{% endhighlight %}

mysql安装工作即可完成

###2. mysqld服务开机启动

首先查看mysqld服务配置

{% highlight bash %}

$ chkconfig --list | grep mysqld
mysqld         	0:关闭	1:关闭	2:关闭	3:关闭	4:关闭	5:关闭	6:关闭

{% endhighlight %}

需要mysqld开机启动，则需要执行

{% highlight bash %}

$ chkconfig mysqld on

{% endhighlight %}

再次查看

{% highlight bash %}

$ chkconfig --list | grep mysqld
mysqld         	0:关闭	1:关闭	2:启用	3:启用	4:启用	5:启用	6:关闭

{% endhighlight %}

配置完工，启动服务

{% highlight bash %}

$ service mysqld start

{% endhighlight %}

###3. 初始化root密码和允许远程访问

初始化root密码，进入mysql数据库

{% highlight bash %}

mysql>update user set password=PASSWORD(‘123456’) where User='root';

{% endhighlight %}

授权远程登陆

{% highlight bash %}

mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
mysql>FLUSH PRIVILEGES;

{% endhighlight %}

> ###References:
>
> [linux下使用yum安装mysql](http://www.2cto.com/database/201207/141878.html)
>
> [CentOS6.2下YUM安装MySQL](http://winteragain.blog.51cto.com/1436066/1147962)
>
> [Mysql初始化root密码和允许远程访问](http://www.cnblogs.com/cnblogsfans/archive/2009/09/21/1570942.html)