# HPSTR Jekyll Theme

They say three times the charm, so here is another free responsive Jekyll theme for you. I've learned a ton since open sourcing my first two themes [on Github](http://github.com/mmistakes), and wanted to try a few new things this time around. If you've used my previous themes most of this should be familiar territory...

## What HPSTR brings to the table:

* Responsive templates for post, page, and post index `_layouts`. Looks great on mobile, tablet, and desktop devices.
* Gracefully degrads in older browsers. Compatible with Internet Explorer 8+ and all modern browsers.  
* Modern and minimal design.
* Sweet animated menu.
* Readable typography to make your words shine.
* Support for large images to call out your favorite posts.
* Comments powered by [Disqus](http://disqus.com) if you choose to enable.
* Social Sharing links for Facebook, Twitter, and Google+ if you choose to enable.
* Simple and clear permalink structure.
* [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) support for a better social sharing experience.
* Simple [custom 404 page](http://mmistakes.github.io/hpstr-jekyll-theme/404.html) to get you started.
* Stylesheets for Pygments and Coderay [syntax highlighting](http://mmistakes.github.io/hpstr-jekyll-theme/code-highlighting-post/) to make your code examples look snazzy
* [Grunt](http://gruntjs.com) build script for easy theme development

[Theme Preview](http://mmistakes.github.io/hpstr-jekyll-theme)

![HPSTR Theme Preview screenshot](http://mmistakes.github.io/hpstr-jekyll-theme/images/hpstr-jekyll-theme-preview.jpg)

---

General notes and suggestions for customizing **HPSTR RDX**.

## Basic Setup for a new Jekyll site

1. [Install Jekyll](http://jekyllrb.com) and read through the documentation if you haven't already.
2. Fork the [HPSTR Jekyll THeme repo](https://github.com/mmistakes/hpstr-jekyll-theme/fork)
3. Clone the repo you just forked to your computer.
4. Edit `_config.yml` to personalize your site.
5. Check out the sample posts in `_posts` to see examples for pulling in large feature images, tags, and other YAML data.
6. Read the documentation below for further customization pointers and documentation.

[Download the Theme](https://github.com/mmistakes/hpstr-jekyll-theme)

**Pro-tip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo that I'm guessing you don't want on your site.

---

## Setup for an Existing Jekyll site

1. Clone the following folders: `_includes`, `_layouts`, `assets`, and `images`.
2. Clone the following files and personalize content as need: `about.md`, `archive.html`, `index.html`, `tags.html`, and `feed.xml`.
3. Set the following variables in your `config.yml` file:

``` yaml
title:            Site Title
description:      Describe your website here.
disqus_shortname: shortname
url:              http://your-website.com

# Owner/author information
owner:
  name:           Your Name
  avatar:         avatar.jpg
  bio:            "Your bio goes here. It shouldn't be super long but a good two sentences or two should suffice."
  email:          you@email.com
  # Social networking links used in footer. Update and remove as you like.
  twitter:        
  facebook:       
  github:         
  stackexchange:  
  linkedin:       
  instagram:      
  flickr:         
  tumblr:         
  # For Google Authorship https://plus.google.com/authorship
  google_plus:    

# Analytics and webmaster tools stuff goes here
google_analytics:   
google_verify:      
# https://ssl.bing.com/webmaster/configure/verify/ownership Option 2 content= goes here
bing_verify:         

# Links to include in top navigation
# For external links add external: true
links:
  - title: Theme Setup
    url: /theme-setup
  - title: External Link
    url: http://mademistakes.com
    external: true

# http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
timezone:    America/New_York
future:      true
pygments:    true
markdown:    kramdown

# Amount of posts to show on home page
paginate: 5
```

---

## More Theme Setup Goodness

To learn more about how to customize the theme, how feature images work, use the Grunt build script, and some other junk, [read up here](http://mmistakes.github.io/hpstr-jekyll-theme/theme-setup/).

---

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub Issue](https://github.com/mmistakes/hpstr-jekyll-theme/issues/new). And if you make something cool with this theme feel free to let me know.

---

## License

This theme is free and open source software, distributed under the [GNU General Public License](https://github.com/mmistakes/hpstr-jekyll-theme/blob/master/LICENSE) version 2 or later. So feel free to use this Jekyll theme on your site without linking back to me or including a disclaimer. 
