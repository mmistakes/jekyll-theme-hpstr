---
layout: post
title: 스테이징 서버 구축
description: "스테이징 서버 구축하기"
modified: 2018-12-27
tags: [aws, server, staging]
image:
  path: /images/start.jpg
  feature: start.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/download-ios-10-and-macos-sierra-wallpapers-for-iphone-ipad-and-mac/
---
## Staging Server 구축하기!
* * *

### 1. Staging Server Structure
* EC2 생성 - 기존 EC2 서버와 동일한 환경으로 생성합니다.
    * Ubuntu 16.04 LTS 프리티어
    * 스토리지(8)
    * 기존 그룹(Web Server - HTTP, SSH, HTTPS)
* S3는 API로 접속하는 개념으로 AWS KEY가 있으면 접속 가능(pem key)
* RDS(DB)는 Production의 RDS 스냅샷을 복원하여 사용합니다.
* Elastic Search 또한 접속의 개념으로 호스트 주소를 입력하여 접속합니다. RDS 또한 호스트 주소를 입력합니다.
* 각 서버에 대한 host와 password 등은 credential에 저장합니다.

<img data-action="zoom" src='{{ "/images/staging_server_structure.png" | relative_url }}' alt='absolute'>

* AWS - Elastic IP <br> EC2를 생성하면 할당되는 IP주소는 서버를 껐다가 킬때마다 변하기 때문에 <br>Elastic IP를 통해 고정 IP주소를 생성합니다.
* 고정된 IP 받아 EC2의 IP를 넣어줬으면 DNS에서 IP를 사용하고자 하는 도메인에 할당합니다.

* * *

### 2. 서버 접속

{% highlight language %}
$ ssh [user]@[도메인]
{% endhighlight %}

* SSH를 통한 접속은 ssh [user]@[도메인]의 형식으로 이루어 집니다.

<img data-action="zoom" src='{{ "/images/ssh.png" | relative_url }}' alt='absolute'>

* 처음 EC2를 생성하면 계정은 ubuntu로 되어있습니다. <br>때문에 ssh 접속 시 ssh ubuntu@< 도메인 >으로 접속합니다.
* DNS에 등록한 도메인을 통해 ssh로 접속이 되는지 확인하면 EC2 생성이 잘 된 것!
* 이제 ubuntu에 필요한 환경을 설정해주면 됩니다. :)

* * *

### 3. 환경구축 방법
* 배포는 Capistrano를 통해 이루어집니다.
<span class="reference"> * Capistrano는 루비로 작성된 원격 서버 배포 자동화 도구이다. 레일즈 뿐만 아니라 다른 언어로 작성된 코드도 쉽게 배포할 수 있다. </span>
* Staging서버 환경 설정은 이 Capistrano를 통해 배포를 하면서 발생하는 에러를 하나하나 해결하는 방법으로 구축합니다.

* * *

### 4. EC2 user 계정 및 권한 설정
* 보안상 새로운 계정을 추가합니다. -> $ sudo adduser deploy / 패스워드는 Production 서버와 동일하게 설정했다.
* sudo 그룹에 deploy 계정을 추가해줍니다. deploy계정에서 sudo 명령어 사용이 가능하게 됩니다! -> $ sudo adducer deploy sudo
* sudo 그룹에 추가했으면 이제 계정을 deploy로 전환해줍니다.->  $ sudo su - deploy
* .ssh 디렉토리를 /home/deploy/에 추가해줍니다. -> $ mkdir .ssh
* .ssh 디렉토리에 authorized_keys 파일을 추가해줍니다. -> $ touch authorized_keys

<img data-action="zoom" src='{{ "/images/rsa_structure.png" | relative_url }}' alt='absolute'>

*  그림에서 보이듯이 authorized_keys는 내 로컬의 id_rsa를 참조하여 해당 사용자가 접근 허용되는지 판명합니다.
* Staging 서버의 authorized_keys에는 Production 서버에서 사용되는 키를 넣어 로컬에는 하나의 키만 넣어줬습니다.
* .ssh 디렉토리에서 rsa를 이용하여 개인키와 공개키를 생성해줍니다. 이 키는 Github에 등록될 키와 비교됩니다.
* 이후 .ssh 디렉토리와 디렉토리 안의 각 파일에 대한 권한을 설정해줍니다.
* Chown 으로 소유권을 변경해주고 Chmod로 권한을 지정해줍니다.

* * *

### 4. EC2 서버 환경설정

* Production서버와 동일한 스펙으로 Staging 서버에 필요한 라이브러리와 서버 등을 install 해줍니다.
* 이는 config/deploy/staging.rb 를 production.rb 와 동일하게 만들어 cap staging deploy 명령어를 통해 배포를 하면서 에러를 보고 구축했습니다.
* 처음 deploy를 할 때 db:create 명령어는 직접 해줘야합니다.
* 각 서버나 라이브러리의 버전은 동일하게 맞춰주거나 최신화를 해줍니다.
* nginx의 경우 etc/nginx/sites-enabled에 파일을 만들어 환경을 설정해줍니다.

* * *

### 5. HTTPS 인증서 (SSL)

* 환경설정을 마치고 deploy가 이상없이 되고 HTTPS 인증서를 받아야합니다.
* certbot를 install하여 이용합니다. 기존에는 돈을 주고 사야했지만 certbot가 무료로 발급을 해줍니다.
* 인증을 신청하기 전에 nginx가 default로 보여주는 페이지의 경로를 찾아갑니다.(Welcome nginx!) 저는 var/www/html 였습니다!
* 해당 파일의 위치에 .well_known 이라는 숨김 파일을 생성해줘야합니다. 이는 certbot이 사용자가 해당 도메인의 주인이라는 것을 확인할 수 있도록 해주는 것입니다.
* 이후 인증의 과정을 거치면 SSL 인증서가 받아지고 이를 etc/nginx/sites-enabled에 생성한 파일에 넣어줍니다.

* * *

