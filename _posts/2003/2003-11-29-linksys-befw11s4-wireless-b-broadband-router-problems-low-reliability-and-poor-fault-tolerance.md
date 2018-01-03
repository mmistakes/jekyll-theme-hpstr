---
layout: post
title: "Linksys BEFW11S4 Wireless-B Broadband Router Problems – Low Reliability and Poor Fault Tolerance"
description: "Linksys BEFW11S4 Wireless-B Broadband Router Problems – Low Reliability and Poor Fault Tolerance"
tags: [technology, review, networks]
modified: 2016-12-30
---

## Background

<div style="float:left; margin:10px;">
<p></p>
<a href="http://www.amazon.com/exec/obidos/ASIN/B00005ARK3/virtualtravel-20"><img src="/images/2003-11_BEFW11S4_v4.jpg" alt="Linksys BEFW11S4 Wireless-B Broadband Router" /></a>
</div>

A few months ago I had to setup a home office and decided I would take the opportunity to upgrade my home network. My Linksys BEFSR41 Etherfast Cable / DSL Router had never given me any problems and so I decided to upgrade to the Linksys BEFW11S4 Wireless-B broadband Router. I now have everything working reliably but getting to this happy state and resolving the problems took a lot of luck and in the end the solution was far from obvious. Judging by the bad reviews on Amazon and elsewhere it appears that many people have been unable to fix similar problems with this device. Below is my description of the problem and a solution that worked for me. Hopefully this will help others, but as always, your mileage may vary!

## Configuration

I have two Macs running OSX on my home network, both machines have static IP addresses and are wired to the router. I wanted to add a wireless Windows Laptop with a DHCP assigned IP address. I purchased a Linksys BEFW11S4 Wireless-B broadband Router and at the same time I bought a Proxim ORiNOCO Gold 802.11a/b/g ComboCard for the Laptop this came with a Proxim client utility. Installation and setup of the laptop card was very easy. Simply plug in the card, insert the disc and install the driver. The card immediately picked up my neighbors open network and I was on the Internet. Setting up the router was a bit more challenging; I copied the configuration from my previous device and enabled DHCP to start issuing IP numbers out of range of my 2 static machines. Everything worked and I was connected to the Internet via my new router.

## Symptoms

The wireless network seemed to work fine for several days but then it “hung”. The only fix was to turn off the router and turn it back on again. This hang affected all machines connected to the router. Whenever they attempted any network operations they would time out. However the Proxim client utility and the laptop claimed the wireless network was still running! The network hung once or twice a week – Annoying, but tolerable. Then I upgraded the laptop from windows 2000 to XP and things got worse! The network would hang one or two times a day. At first I did not connect the OS upgrade with the router problems, besides, I had another bigger issue.

I connect to work via a Cisco VPN client which seemed to be working ok but all of a sudden (in fact immediately after the XP upgrade), Microsoft Exchange slowed to glacial speed. It would take hours to sync with the Exchange Server. This was not acceptable. I had to fix things. I called our company technical support and got through to the guy who manages the VPN. He said “What order did you install the wireless card driver and the VPN client? Because they don’t play nice together and you must install the wireless card driver first and then the VPN client”.

## Solution

1. Download and install the latest firmware upgrade from Linksys. This is not enough to fix the problem on its own. I tried this first and the network still hung. But it’s a good idea and this solution may not work without it.
2. Uninstall the Cisco VPN client and the Proxim client utility from the laptop
3. Reinstalled the Proxim client utility on the laptop
4. Reinstalled the Cisco VPN client on the laptop
Outcome

The network has been running for 10 days without a single hitch.

## Cause

I’m still not certain what the cause was but this is what I suspect. The VPN client and Proxim client utility share something in common dlls or configuration or something! When installed in the wrong order things get messed up and in unusual circumstances the laptop sends network traffic that is somehow malformed. This affects the router and causes it to hang. Basically the router appears to be intolerant of glitches in low level network messages and this leads to low reliability. Not a great explanation I know and it may be completely spurious but my network now works reliably so I’m happy!