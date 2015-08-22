---
layout: post
title: 大神一笑
modified: 2014-01-05
tags: [Shadowsocks]
image:
  feature: abstract-3.jpg
---

记录下大神yixiao的Shadowsocks客户端配置方法。

##1. 首先下载Shadowsocks客户端

推荐使用客户端shadowsocks-gui，下载地址

[`http://sourceforge.net/projects/shadowsocksgui/files/dist/`](http://sourceforge.net/projects/shadowsocksgui/files/dist/)

目测是会被墙的节奏，所以本地备两个下载链接:

[Mac OSX - ShadowsocksX-1.0.7.dmg](/attachment/ShadowsocksX-1.0.7.dmg)

[Windows - shadowsocks-gui-0.4.1-win-ia32.7z](/attachment/shadowsocks-gui-0.4.1-win-ia32.7z)

##2. 配置Shadowsocks客户端

Server IP:   106.187.100.xxx

Server Port: 3389

Password:    \*\*\*\*\*\*\*\*

SOCKS 5 Proxy Port: 1080

Encryption Method:  AES-256-CFB

Timeout in Second:  600

##3. 安装Proxy SwitchSharp

直接Chrome搜索相关软件即可，链接:

[`https://chrome.google.com/webstore/detail/proxy-switchysharp/dpplabbmogkhghncfbfdeeokoefdjegm`](https://chrome.google.com/webstore/detail/proxy-switchysharp/dpplabbmogkhghncfbfdeeokoefdjegm)

但是估计会被墙，此处备一个下载链接:

[extension_1_10_4.crx](/attachment/extension_1_10_4.crx)

还是安装不上就直接跳到第5步

##4. 配置Proxy SwitchSharp

手动配置:

SOCKS代理:127.0.0.1 端口:1080

SOCKS v5

保存即可

为了自动选择代理，可以使用pac文件:

[flora_pac.pac](/attachment/flora_pac.pac)

直接导入pac配置更佳，MAC OSX亲测可用。

##5. 全局代理配置

使用Proxifier做全局代理，使所有网络请求都经过Shadowsocks，一般用不上，但这里也做个记录。

先备两个链接

[Mac OSX - ProxifierMac.zip](/attachment/ProxifierMac.zip)

[Windows - HA-Proxifier321-LDR.rar](/attachment/HA-Proxifier321-LDR.rar)

注册方法自寻吧。

##6. 配置全局代理

这个比较简单，与配置Proxy SwitchSharp相似，选择`代理服务器配置`，配置地址，端口和SOCKS5，点击确定，弹框一律确定即可。

当打开Proxifier后，系统便实现了全局代理，若需要访问内网资源则一定打不开，所以不是很好用。
