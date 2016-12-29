---
layout: post
title: "5 Nines and other Nonsense – Interaction of Quality Attributes in System Design"
description: "Interaction of Quality Attributes in System Design, Availability, Reliability and Recoverability"
tags: [system design]
modified: 2016-12-23
---
5 Nines is a term used in the computer industry that refers to the 5 nines in 99.999%. This number is about the best odds manufacturers will give that one of their systems will be available at any given moment in time. Of course there are systems with higher availability but they tend to have very expensive multiple redundancy. 5 Nines is the best availability claimed for commercial system, and after all, 99.999% availability is pretty good. 5 Nines translates to a downtime of only 5 minutes a year.

While this makes for good marketing material it does not make very much sense even if it were possible. A typical user does not think in terms of availability. Instead they think in terms of system failure; how frequently it happens (reliability), and how long it takes them to recover afterwards (recoverability). All three factors must be taken into consideration when specifying desired system quality.

- **Availability** Probability of nominal operation
- **Reliability** Mean Time Between Failure (MTBF)
- **Recoverability** Mean Time To Recover (MTTR)

To illustrate the interaction of these three attributes consider a system with a high availability of 99.999%, a low reliability (MTBF of about 30 hours). The system fails every 30 hours but it is only unavailable for one second each time. There are about 300 failures in a year adding up to a total downtime of 5 minutes. As soon as the hardware returns from it’s one second absence the software starts an automatic recovery process. This is where the definition of MTTR becomes important. A hardware manufacturer will claim that the mean time to recover is less than a second. However while the hardware may be available the system it supports is going through a software recovery process. On a large database system this type of recovery could take up to 5 hours! From a user perspective the system is unavailable for normal use for 5 hours out of every 30 while it recovers. That is a mere 83.3% percieved availability.

This extreme case is not as unlikely as one might think. I once had to build an interface that linked two large systems connected to each other via a leased microwave telephone link. The phone company guaranteed a 1 hour downtime a year. 99.99% availability. What they neglected to tell us was that this downtime would be spread randomly throughout the year in fraction of a second increments. Eventually we worked out what was happening and tweaked our already fault tolerant system to accommodate the unexpectedly frequent failures. Fortunately our MTTR was negligible.

Availability, Reliability, and Recoverability are just three system quality attributes. There are many more. Picking just one to raise above all the others is nonsense, It is the way these attributes interact with each other that is really important.