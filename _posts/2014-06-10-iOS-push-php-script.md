---
layout: post
title:  "iOS Push Notification PHP Script"
date:   2014-06-09 12:25:10
tags: [iOS, PHP]
---

iOS下发push有点麻烦，下面是一个网上搜来的php脚本，是根据《iOS 7 Programming Cookbook》书中的测试脚本修改的，用来测试证书是否配置正确。

{% highlight php %}

<?php
    // Development环境使用
    // $apnsServer = 'ssl://gateway.sandbox.push.apple.com:2195';
    // Distribution环境使用
    $apnsServer = 'ssl://gateway.push.apple.com:2195';
    // 设备的token信息
    $deviceToken = '244e68bc18f49652ab4b274e1ee9e5246f22815a4d8f2e88a03c1b9b23ed7a4e';
    // 发push用的证书
    $pushCertAndKeyPemFile = 'ck.pem';

    $stream = stream_context_create();

    // 证书密码，如果没有密码则不需要
    // $privateKeyPassword = 'quizup2014';
    // stream_context_set_option($stream, 'ssl', 'passphrase', $privateKeyPassword);

    stream_context_set_option($stream, 'ssl', 'local_cert', $pushCertAndKeyPemFile);
    $connectionTimeout = 20;
    $connectionType = STREAM_CLIENT_CONNECT | STREAM_CLIENT_PERSISTENT;
    $connection = stream_socket_client($apnsServer,
                                       $errorNumber,
                                       $errorString,
                                       $connectionTimeout,
                                       $connectionType,
                                       $stream);
  if (!$connection){
    echo "Failed to connect to the APNS server. Error no = $errorNumber"; exit;
  } else {
    echo "Successfully connected to the APNS. Processing..." . PHP_EOL;
  }

  $message = 'Welcome to Push';
  $messageBody['aps'] = array('alert' => $message, 'sound' => 'default');
  $payload = json_encode($messageBody);
  $notification = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;
  $wroteSuccessfully = fwrite($connection, $notification, strlen($notification));
  if (!$wroteSuccessfully){
    echo "Could not send the message" . PHP_EOL;
  } else {
    echo "Successfully sent the message" . PHP_EOL;
  }
  fclose($connection);
?>

{% endhighlight %}

《iOS 7 Programming Cookbook》书中测试脚本原文:

{% highlight php %}

<?php
    /* We are using the sandbox version of the APNS for development. For production
     environments, change this to ssl://gateway.push.apple.com:2195 */
    $apnsServer = 'ssl://gateway.sandbox.push.apple.com:2195';
    /* Make sure this is set to the password that you set for your private key
     when you exported it to the .pem file using openssl on your OS X */
    $privateKeyPassword = '1234';
    /* Put your own message here if you want to */
    $message = 'Welcome to iOS 7 Push Notifications';
    /* Pur your device token here */
    $deviceToken = '05924634A8EB6B84437A1E8CE02E6BE6683DEC83FB38680A7DFD6A04C6CC586E';
    /* Replace this with the name of the file that you have placed by your PHP
     script file, containing your private key and certificate that you generated
     earlier */
    $pushCertAndKeyPemFile = 'PushCertificateAndKey.pem';
    $stream = stream_context_create();
    stream_context_set_option($stream,
                              'ssl',
                              'passphrase',
                              $privateKeyPassword);
    stream_context_set_option($stream,
                              'ssl',
                              'local_cert',
                              $pushCertAndKeyPemFile);
    $connectionTimeout = 20;
    $connectionType = STREAM_CLIENT_CONNECT | STREAM_CLIENT_PERSISTENT;
    $connection = stream_socket_client($apnsServer,
                                       $errorNumber,
                                       $errorString,
                                       $connectionTimeout,
                                       $connectionType,
                                       $stream);
    if (!$connection){
        echo "Failed to connect to the APNS server. Error no = $errorNumber<br/>"; exit;
    } else {
        echo "Successfully connected to the APNS. Processing...</br>";
    }

    $messageBody['aps'] = array('alert' => $message, 'sound' => 'default',
                                'badge' => 2,
                                );
    $payload = json_encode($messageBody);
    $notification = chr(0) .
                    pack('n', 32) .
                    pack('H*', $deviceToken) .
                    pack('n', strlen($payload)) .
                    $payload;
    $wroteSuccessfully = fwrite($connection, $notification, strlen($notification));
    if (!$wroteSuccessfully){
        echo "Could not send the message<br/>";
    } else {
        echo "Successfully sent the message<br/>"; }
    fclose($connection);
?>

{% endhighlight %}