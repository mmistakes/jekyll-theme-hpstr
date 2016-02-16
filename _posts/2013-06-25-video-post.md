---
layout: post
title: "A Post with a Video"
description: "Custom written post descriptions are the way to go... if you're not lazy."
tags: [sample post, video]
---

{::nomarkdown}
<iframe width="560" height="315" src="//www.youtube.com/embed/SU3kYxJmWuQ" frameborder="0" allowfullscreen></iframe>
{:/nomarkdown}

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Adding YouTube video embeds causes errors when building your Jekyll site. To fix wrap the html within `{::nomarkdown}` tags. Example below:

{% highlight html %}
{::nomarkdown}
<iframe width="560" height="315" src="//www.youtube.com/embed/SU3kYxJmWuQ" frameborder="0" allowfullscreen></iframe>
{:/nomarkdown}
{% endhighlight %}