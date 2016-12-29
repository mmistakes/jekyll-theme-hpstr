---
layout: post
title: "The Eight Fallacies of Distributed Computing"
description: "The Eight Fallacies of Distributed Computing"
tags: [networking, system design]
modified: 2016-12-30
---
[L. Peter Deutsch](https://en.wikipedia.org/wiki/L_Peter_Deutsch) first published the “8 Fallacies of Networking” internally while working at Sun Labs in 1991-92. This is a great list of the kind of wishful thinking that clouds so much system design.

Essentially everyone, when they first build a distributed application, makes the following eight assumptions. All prove to be false in the long run and all cause big trouble and painful learning experiences.

> 1. The network is reliable
> 2. Latency is zero
> 3. Bandwidth is infinite
> 4. The network is secure
> 5. Topology doesn’t change
> 6. There is one administrator
> 7. Transport cost is zero
> 8. The network is homogeneous