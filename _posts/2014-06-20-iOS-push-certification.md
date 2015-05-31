---
layout: post
title:  "iOS 生成Push证书"
date:   2014-06-20
tags: [iOS]
---

本文转载自[http://www.sunyuping.cn/](http://www.sunyuping.cn/wordpress/?p=131)

IOS的推送证书，有有效期限制，一般为一年。当我们证书过期的时候，就需要重新生成证书了。有一段时间没有上苹果网站了，昨天上去一看，此奥，改版了，下边我们将重新生成一个正式环境的push推送的证书。

###1. 先打开钥匙串(应用程序-实用工具-钥匙串访问)，请求一个证书

![Image]({{ site.url }}/images/20140620_push_001.png)

常用名称写为：2013.04.27_push_production_***。并保存到磁盘上。

###2. 进入打开苹果网站的证书标签页面，选择 Identifiers标签下边的App IDs子标签，显示下边图片。红色圈中的是我要重新生成push签名的证书。点击此证书。

![Image]({{ site.url }}/images/20140620_push_002.png)

###3. 证书详情标签，罗列出了所有的功能状态，最后的Push Notifications显示可以配置，并不是Enabled可以状态，所以点击Setting功能重新上传证书。

![Image]({{ site.url }}/images/20140620_push_003.png)

###4. 证书设置页面中，最下边的Push Notifications 如下图所示。

![Image]({{ site.url }}/images/20140620_push_004.png)

其中：Development SSL Certificate是测试环境证书，Production SSL Certificate为正式环境证书，我们生成正式环境的证书，点击后面的Create Certificate。

###5. Create Certificate页面如下。点击下边的continue。

![Image]({{ site.url }}/images/20140620_push_005.png)

###6. 选择上传的证书，我们第一步已经生成了一个证书，上传此证书。

![Image]({{ site.url }}/images/20140620_push_006.png)

###7. 上传成功后，将会显示下边的图片。有可能在生成证书的过程中会有loading框一直在转转转，这时候重新进入此页面即可。其实此时证书已经生成了。

![Image]({{ site.url }}/images/20140620_push_007.png)

此时，push证书已经生成，上边会标注过期时间，push的证书有效期为一年。点击Download下载此证书。
 
###8. 双击刚才下载的证书，会自动把此证书加入到钥匙串的签名中，如下图标示，红色圈中的，既是我刚才添加的证书，展开此证书

![Image]({{ site.url }}/images/20140620_push_008.png)

先右键点击 Apple Production IOS PushServices:com.***.***，先导出一个.p12文件。命名为cert.p12。在导出的过程中会让输入导出密码，输入相应的密码即可。

###9. 在2012.04.27_push_producation_***上点击右键，导出一个.p12的文件，命名为key.p12，与上边相同在导出的过程中会让输入导出密码，输入相应的密码即可。

![Image]({{ site.url }}/images/20140620_push_009.png)

###10. 到此为止，我们已经有了两个.p12文件，把他们放到同一个文件夹(aaa)下，需要把两个.p12文件转换成.pem文件。

a.先打开终端，切换到文件夹aaa下执行

{% highlight bash %}

openssl pkcs12 -clcerts -nokeys -out cert.pem -in cert.p12

{% endhighlight %}

在执行的时候，将会让输入密码，输入刚才设置的密码即可生成一个cert.pem文件。

b.再执行：

{% highlight bash %}

openssl pkcs12 -nocerts -out key.pem -in key.p12

{% endhighlight %}

此时要注意在终端中的提示，第一次输入的密码是生成证书时候的密码，第二次第三次输入密码是设置key.pem的新密码。

c.如果需要对 key不进行加密，执行下边语句

{% highlight bash %}

openssl rsa -in key.pem -out key.unencrypted.pem

{% endhighlight %}

d.然后就可以合并两个.pem文件,这个ck.pem就是服务端需要的证书了。

{% highlight bash %}

cat cert.pem key.unencrypted.pem > ck.pem

{% endhighlight %}

此时，把生成的ck.pem给服务器端的人员即可。
