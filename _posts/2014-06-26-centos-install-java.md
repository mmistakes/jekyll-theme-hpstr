---
layout: post
title: "CentOS 6.5 安装 JDK"
modified: 2014-06-26 13:20:06 +0800
tags: [CentOS, Java, JDK]
---

安装了CentOS后，需要安装JDK，系统默认安装了OpenJDK，所以需要先将其卸载，再重新安装。

###1. 删除OpenJDK

检验系统原版本

{% highlight bash %}

$ java -version
java version "1.7.0_55"
OpenJDK Runtime Environment (rhel-2.4.7.1.el6_5-x86_64 u55-b13)
OpenJDK 64-Bit Server VM (build 24.51-b03, mixed mode)

{% endhighlight %}

可以看到系统原安装有OpenJDK 1.7.0_55，进一步查看JDK信息

{% highlight bash %}

$ rpm -qa | grep java
tzdata-java-2014e-1.el6.noarch
java-1.6.0-openjdk-1.6.0.0-5.1.13.3.el6_5.x86_64
java-1.7.0-openjdk-1.7.0.55-2.4.7.1.el6_5.x86_64

{% endhighlight %}

可以看到系统中安装有OpenJDK1.6和1.7，在此需要将其卸载，使用root用户完成如下操作

{% highlight bash %}

$ rpm -e --nodeps tzdata-java-2014e-1.el6.noarch
$ rpm -e --nodeps java-1.6.0-openjdk-1.6.0.0-5.1.13.3.el6_5.x86_64
$ rpm -e --nodeps java-1.7.0-openjdk-1.7.0.55-2.4.7.1.el6_5.x86_64

{% endhighlight %}

###2. 安装JDK

先在官网下载好JDK的安装包，此处下载了jdk8u5的rpm包

{% highlight bash %}

$ rpm -ivh jdk-8u5-linux-x64.rpm

{% endhighlight %}

JDK默认安装在/usr/java中。

验证是否安装成功

{% highlight bash %}

$ java -version
java version "1.8.0_05"
Java(TM) SE Runtime Environment (build 1.8.0_05-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.5-b02, mixed mode)

{% endhighlight %}

安装成功

###3. 配置环境变量

修改系统环境变量文件

{% highlight bash %}

$ vim /etc/profile

{% endhighlight %}

在最后追加如下内容

{% highlight bash %}

JAVA_HOME=/usr/java/jdk1.8.0_05
JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
export JAVA_HOME JRE_HOME PATH CLASSPATH

{% endhighlight %}

JAVA_HOME=/usr/java/jdk1.8.0_05 目录为JDK的安装目录

然后让修改立即生效

{% highlight bash %}

$ source /etc/profile

{% endhighlight %}

大功告成！

> ###References:
>
> [CentOS-6.3安装配置JDK-7](http://www.cnblogs.com/zhoulf/archive/2013/02/04/2891608.html)