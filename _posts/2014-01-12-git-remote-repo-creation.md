---
layout: post
title: "git 使用基本方法"
modified: 2014-01-12 00:16:58 +0800
tags: [git]
---

#1. 创建一个远程仓库

##1. 登陆远程服务器，创建一个空仓库

登陆到服务器，运行:

{% highlight bash %}

$ mkdir hello.git 
$ cd hello.git 
$ git --bare init 

{% endhighlight %}

便可以生成新的git仓库

##2. 本地同步仓库

### 方法一: 比较简单的方法

直接拉取远程仓库:

{% highlight bash %}

$ git clone ssh://user@10.2.43.99/~/hello.git

{% endhighlight %}

此时会拉取下来一个空白仓库，hello文件夹下只有.git文件夹，并且无log信息。

本地进行添加文件和修改，创建commit，之后push到远程，以创建第一个节点:

{% highlight bash %}

$ touch readme.txt
$ git add .
$ git commit -m "init repo."
$ git push origin master

{% endhighlight %}

即可完成本地库与远程库同步

### 方法二: 比较麻烦的方法

在本地建立一个git库并初始化:

{% highlight bash %}

$ mkdir hello 
$ git init

{% endhighlight %}

在本地仓库做修改，再将本地仓库同步到远程仓库上

{% highlight bash %}

$ git remote add origin ssh://user@10.2.43.99/home/username/hello.git
$ git push origin master

{% endhighlight %}

> 以上方法二选一即可

#2. 显示仓库信息

##1. 仓库配置信息

{% highlight bash %}

$ git config -l

{% endhighlight %}

显示的信息为`.git/config`文件的信息

##2. 获取最新仓库到本地

从远程的分支获取最新的版本到本地

{% highlight bash %}

$ git fetch

{% endhighlight %}

从远程获取最新版本到本地，但不会自动merge

##3. 显示分支信息

{% highlight bash %}

$ git branch -a

{% endhighlight %}

使用参数 `-r` 可以查看远程分支

##4. 显示远程信息

{% highlight bash %}

$ git remote show origin 

{% endhighlight %}

显示origin库的配置信息

#3. 分支同步

##1. 本地创建分支

{% highlight bash %}

$ git checkout -b  testing origin/testing

{% endhighlight %}

将远程的testing分支同步到本地

##2. 向远程库推送代码

{% highlight bash %}

$ git push origin testing:testing

{% endhighlight %}

这等效于

{% highlight bash %}

$ git push origin testing

{% endhighlight %}

> 如果配置了gerrit管理远程git仓库，则需要指定远程仓库地址
>
> 如:`git push origin testing:refs/for/testing`

##3. 创建远程分支

首先创建本地分支

{% highlight bash %}

$ git branch testing

{% endhighlight %}

然后将它推送到远程分支

{% highlight bash %}

$ git push origin testing

{% endhighlight %}

这样便可以自动创建一个远程分支

> 如果配置了gerrit管理远程git仓库，则需要使用gerrit创建分支

##4. 删除远程分支

{% highlight bash %}

$ git push origin :testing

{% endhighlight %}

远程的testing将被删除，但是本地还会保存的

> 如果配置了gerrit管理远程git仓库，则需要使用gerrit删除分支

#4. 使用git submodule

##1. 建立一个submodule

{% highlight bash %}

$ git submodule add git@domain.com:another_project.git another_project

{% endhighlight %}

例如:

{% highlight bash %}

$ git submodule add ssh://user@10.2.43.99/~/hello.git static/hello

{% endhighlight %}

然后需要commit一下，完成配置。

对于本地代码，还需要init一下，才会在`.git/config`中产生相应信息。

{% highlight bash %}

$ git submodule init

{% endhighlight %}

##2. 更新submodule

{% highlight bash %}

$ git submodule update

{% endhighlight %}

只有更新过submodule之后，才能够拉取下远程仓库的内容

##3. 删除submodule

删除submodule并没有相关的指令，需要清理掉相关的信息，才能够删除响应的submodule

先删除掉相应目录

{% highlight bash %}

$ git rm --cached [欲移除的目錄]
$ rm -rf [欲移除的目錄]

{% endhighlight %}

再修改`.gitmodules`，删除相应内容

{% highlight bash %}

$ vim .gitmodules

{% endhighlight %}

再修改`.git/config`，删除相应内容

{% highlight bash %}

$ vim .git/config

{% endhighlight %}

提交修改

{% highlight bash %}

$ git add .gitmodules
$ git commit -m "Remove a submodule"

{% endhighlight %}

安全起见，最后`sync`一下

{% highlight bash %}

$ git submodule sync

{% endhighlight %}

> ##Reference:
>
> [git--远程仓库](http://blog.csdn.net/adream307/article/details/6394981)
>
> [为git安装一个远程仓库](http://zhiwei.li/text/2010/05/%E4%B8%BAgit%E5%AE%89%E8%A3%85%E4%B8%80%E4%B8%AA%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93/)
>
> [git 使用远程库 （zz）](http://www.cnblogs.com/dqshll/articles/1791234.html)
>
> [Git Submodule 的認識與正確使用！](http://www.josephj.com/entry.php?id=342)

