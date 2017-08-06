---
layout: post
title: "Movabletype 2.661 Entity Relationship Diagram"
description: "Movabletype 2.661 Entity Relationship Diagram"
tags: [system design, reviews, information visualization]
modified: 2017-06-15
---
I have been experimenting with [Python](https://www.python.org/) 2.3 and[MySQL](https://www.mysql.com/) 4.0.13 recently and have been using a copy of my Movabletype 2.661 database as a sandbox. Before I started a spent a few minutes working out the structure of the database. This Entity Relationship Diagram is what I came up with. I expect version 3.0 of Movabletype is different, but just in case anyone else is digging around in Movabletype and could use a map here is a [pdf version](/content/2004/2004-08-MT-ERD.pdf).

<div align="center">
{% capture images %}
    /images/2004-08-MT-ERD.png
{% endcapture %}
{% include gallery images=images caption="Moveable Type Entity Relationship Diagram" cols=1 %}
</div>

I have not included the “MT_” prefix on every table name or the table name prefix on every column but otherwise I think its accurate. The guys at [Six Apart](https://movabletype.com/) seem to like using surrogate keys and then denormalizing them. Surrogate keys are worthwhile if you want to optimize joins but they seem to have been introduced where they will never be used in a join (the placement table for example). Also the denormalization of keys (blog_id on the comment table for example) seems a bit pointless given the small size of the system. The average blog is never going to have a significant number (>50,000) of entries and I’m pretty certain performance will only be marginally improved for such low volumes. Unless they are using this same model for [Typepad](http://www.typepad.com/) in which case it might be worthwhile. The only valid reason I can think of for this kind of denormalization in such a small system is to simplify the sql. Mysql does seem fairly limiting – no support for sub-queries etc, so maybe that’s why they did it. Anyway let me know if I got anything wrong and I’ll correct it.


