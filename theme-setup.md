---
layout: page
permalink: /theme-setup/
title: Theme Setup
description: "Instructions on how to install and customize the modern Jekyll theme HPSTR."
tags: [Jekyll, theme, install, setup]
image:
  feature: abstract-11.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
share: true
---

General notes and suggestions for customizing **HPSTR**.

## Basic Setup for a new Jekyll site

1. [Install Bundler](http://bundler.io) `gem install bundler` and then install [Jekyll](http://jekyllrb.com) and all dependencies `bundle install`.
2. Fork the [HPSTR Jekyll Theme repo](https://github.com/mmistakes/hpstr-jekyll-theme/fork).
3. Clone the repo you just forked and rename it.
4. Edit `_config.yml` to personalize your site.
5. Check out the sample posts in `_posts` to see examples for pulling in large feature images, assigning categories and tags, and other YAML data.
6. Read the documentation below for further customization pointers and documentation.

<div markdown="0"><a href="https://github.com/mmistakes/hpstr-jekyll-theme/archive/master.zip" class="btn">Download the Theme</a></div>

**Pro-tip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you don't want on your site.
{: .notice}

---

## Setup for an Existing Jekyll site

1. Clone the following folders: `_includes`, `_layouts`, `assets`, and `images`.
2. Clone the following files and personalize content as need: `about.md`, `posts.html`, `index.html`, `tags.html`, and `feed.xml`.
3. Set the following variables in your `config.yml` file:

{% highlight yaml %}
title:            Site Title
description:      Describe your website here.
disqus_shortname: shortname
# Your site's domain goes here. When working locally use localhost server leave blank
# PS. If you set this wrong stylesheets and scripts won't load and most links will break.
# PPS. If you leave it blank for local testing home links won't work, they'll be fine for live domains though.
url:              http://localhost:4000

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
{% endhighlight %}

---

## Folder Structure

{% highlight bash %}
hpstr-jekyll-theme/
├── _includes
|    ├── browser-upgrade.html  # prompt to upgrade browser on < IE8
|    ├── footer.html  # site footer
|    ├── head.html  # site head
|    ├── navigation.html # site navigation
|    └── scripts.html  # jQuery, plugins, GA, etc
├── _layouts
|    ├── page.html  # page layout
|    ├── page.html  # post-index layout used on home page
|    └── post.html  # post layout
├── _posts
├── assets
|    ├── css  # preprocessed less styles
|    ├── js
|    |   ├── _main.js  # plugin options
|    |   ├── scripts.min.js  # concatenated and minifed site scripts
|    |   ├── plugins  # plugin scripts
|    |   └── vendor  # jQuery and Modernizr scripts
|    └── less 
├── images  # images for posts and pages
├── _config.yml  # Jekyll options
├── about.md  # about page
├── index.html  # home page
├── posts.html  # all posts
└── tags.html  # all posts grouped by tag
{% endhighlight %}

---

## Customization

### _config.yml

Most of the variables found here are used in the .html files found in `_includes` if you need to add or remove anything. A good place to start would be to add the `title`, `description`, and `url` for your site. Links are absolute and prefixed with `{{ "{{ site.url " }}}}` in the various `_includes` and `_layouts`, so remember to properly set `url`[^1] to `http://localhost:4000` when developing locally.

#### Disqus Comments

Create a [Disqus](http://disqus.com) account and change `disqus_shortname` in `_config.yml` to the Disqus *shortname* you just setup. To enable commenting on a post, add the following to its front matter:

{% highlight yaml %}
comments: true
{% endhighlight %}

#### Social Share Links

To enable Facebook, Twitter, and Google+ share links on a post or page, add the following to its front matter:

{% highlight yaml %}
share: true
{% endhighlight %}

#### Owner/Author Information

Change your name, and avatar photo (200x200 pixels or larger), email, and social networking URLs. If you want to link to an external image on Gravatar or something similar you'll need to edit the path in `head.html` since it assumes it is located in `/images`.

Including a link to your Google+ profile has the added benefit of displaying [Google Authorship](https://plus.google.com/authorship) in Google search results if you've went ahead and applied for it.

#### Google Analytics and Webmaster Tools

Your Google Analytics ID goes here along with meta tags for [Google Webmaster Tools](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=35179) and [Bing Webmaster Tools](https://ssl.bing.com/webmaster/configure/verify/ownershi) site verification.

#### Navigation Menu Links

Edit page/post titles and URLs to include in the site's navigation. For external links add `external: true`.

{% highlight yaml %}
# sample top navigation links
links:
  - title: Other Page
    url: /other-page/
  - title: External Link
    url: http://mademistakes.com
    external: true 
{% endhighlight %}

#### Background Images

To utilize this "feature" just add the following YAML to a post's front matter. ([View demo](http://mmistakes.github.io/hpstr-jekyll-theme/background-image/))

{% highlight yaml %}
image:
  background: filename.png
{% endhighlight %}

This little bit of YAML makes the assumption that your background image asset is in the `/images` folder. If you place it somewhere else or are hot linking from the web, just include the full http(s):// URL. Either way you should have a background image that is tiled.

If you want to set a background image for the entire site just add `background: filename.png` to your `_config.yml` and BOOM --- background images on every page!

#### Other Stuff

The rest is just your average Jekyll config settings. Nothing too crazy here...

### _includes

For the most part you can leave these as is since the author/owner details are pulled from `_config.yml`. That said you'll probably want to customize the copyright stuff in `footer.html` to your liking.

### Reading Time

On by default. To turn off remove `reading_time` from `_config.yml. Default words per minute is set at 200 and can changed by updating `words_per_minute` in `_config.yml`.

### Adding Posts and Pages

There are two main content layouts: `post.html` (for posts) and `page.html` (for pages). Both have support for large **feature images** that span the full-width of the screen, and both are meant for text heavy blog posts (or articles).

There are two rake tasks that can be used to create a new post or page with all YAML Front Matter. Using either `rake new_post` or `rake new_page` will prompt you for a title and tags to classify them. Example below:

{% highlight bash %}
rake new_post

Enter a title for your post: My Awesome Post
Enter tags to classify your post (comma separated): web development, code
Creating new post: _posts/2014-02-10-my-awesome-post.md
{% endhighlight %}

There are a few configuration variables that can be changed in `Rakefile.rb`. By default posts and pages will be created in MarkDown using the `.md` extension.

#### Feature Images

A good rule of thumb is to keep feature images nice and wide so you don't push the body text too far down. An image cropped around around 1024 x 256 pixels will keep file size down with an acceptable resolution for most devices. If you want to serve these images responsively I'd suggest looking at the [Jekyll Picture Tag](https://github.com/scottjehl/picturefill)[^2] plugin.

The two layouts make the assumption that the feature images live in the *images* folder. To add a feature image to a post or page just include the filename in the front matter like so. 

{% highlight yaml %}
image:
  feature: feature-image-filename.jpg
  thumb: thumbnail-image.jpg #keep it square 200x200 px is good
{% endhighlight %}

If you want to apply attribution to a feature image use the following YAML front matter on posts or pages. Image credits appear directly below the feature image with a link back to the original source.

{% highlight yaml %}
image:
  feature: feature-image-filename.jpg
  credit: Michael Rose #name of the person or site you want to credit
  creditlink: http://mademistakes.com #url to their site or licensing
{% endhighlight %}

#### Post/Page Thumbnails for OG and Twitter Cards

Post and page thumbnails work the same way. These are used by [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) meta tags found in `head.html`. If you don't assign a thumbnail the image you assigned to `site.owner.avatar` in `_config.yml` will be used.

Here's an example of what a tweet to your site could look like if you activate Twitter Cards and include all the metas in your post's YAML.

![Twitter Card summary large image screenshot]({{ site.url }}/images/twitter-card-summary-large-image.jpg)

#### Videos

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

{% highlight html %}
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0"> </iframe>
{% endhighlight %}

#### Twitter Cards

Twitter cards make it possible to attach images and post summaries to Tweets that link to your content. Summary Card meta tags have been added to `head.html` to support this, you just need to [validate and apply your domain](https://dev.twitter.com/docs/cards) to turn it on.

#### Link Post Type

Link blog like a champ by adding `link: http://url-you-want-linked` to a post's YAML front matter. Arrow glyph links to the post's permalink and the the `post-title` links to the source URL. Here's an [example of a link post]({{ site.url }}/sample-link-post/) if you need a visual.

---

## Theme Development

If you want to easily skin the themes' colors and fonts, take a look at `variables.less` in `assets/less/` and make the necessary changes to the color and font variables. To make development easier I setup a Grunt build script to compile/minify the LESS files into `main.min.css` and lint/concatenate/minify all scripts into `scripts.min.js`. [Install Node.js](http://nodejs.org/), then [install Grunt](http://gruntjs.com/getting-started), and then install the dependencies for the theme contained in `package.json`:

{% highlight bash %}
npm install
{% endhighlight %}

From the theme's root, use `grunt` to rebuild the CSS, concatenate JavaScript files, and optimize .jpg, .png, and .svg files in the `images/` folder. You can also use `grunt watch` in combination with `jekyll build --watch` to watch for updates to your LESS and JS files that Grunt will then automatically re-build as you write your code which will in turn auto-generate your Jekyll site when developing locally.

And if the command line isn't your thing (you're using Jekyll so it probably is), [CodeKit](http://incident57.com/codekit/) for OS X and [Prepros](http://alphapixels.com/prepros/) for Windows are great alternatives.

---

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub Issue](https://github.com/mmistakes/hpstr-jekyll-theme/issues/new). And if you make something cool with this theme feel free to let me know.

---

## License

This theme is free and open source software, distributed under the [GNU General Public License]({{ site.url }}/LICENSE) version 2 or later. So feel free to to modify this theme to suit your needs.

---

[^1]: Used to generate absolute urls in `sitemap.xml`, `feed.xml`, and for canonical urls in `head.html`. Don't include a trailing `/` in your base url ie: http://mademistakes.com. When developing locally I suggest using http://localhost:4000 or whatever localhost you're using to properly load all theme stylesheets, scripts, and image assets. If you leave this variable blank all links will resolve correctly except those pointing to home.

[^2]: If you're using GitHub Pages to host your site be aware that plugins are disabled. So you'll need to build your site locally and then manually deploy if you want to use this sweet plugin.