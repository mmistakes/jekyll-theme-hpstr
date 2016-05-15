---
layout: page
title: Theme Setup
description: "Instructions on how to install and customize the modern Jekyll theme HPSTR."
image:
  feature: abstract-11.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
share: true
---

General notes and suggestions for customizing **HPSTR**.

HPSTR now requires [Jekyll](http://jekyllrb.com/) 3.0. Make sure to run `bundle update` if you aren't on the latest version to update all gem dependencies.

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

1. Clone the following folders: `_includes`, `_layouts`, `_sass`, `assets`, and `images`.
2. Clone the following folders/files and personalize content as need: `about/`, `posts/`, `tags/`, `feed.xml` and `index.html`.
3. Edit `_config.yml` to personalize your site.

---

## Running Jekyll

The preferred method for running Jekyll is with `bundle exec`, but if you're willing to deal gem conflicts feel free to go cowboy with a `jekyll build` or `jekyll serve`.

> In some cases, running executables without bundle exec may work, if the executable happens to be installed in your system and does not pull in any gems that conflict with your bundle.
>
>However, this is unreliable and is the source of considerable pain. Even if it looks like it works, it may not work in the future or on another machine.

{% highlight text %}
bundle exec jekyll build

bundle exec jekyll serve
{% endhighlight %}

---

## Folder Structure

{% highlight bash %}
hpstr-jekyll-theme/
├── _includes
|    ├── browser-upgrade.html       # prompt to upgrade browser on < IE8
|    ├── footer.html                # site footer
|    ├── head.html                  # site head
|    ├── navigation.html            # site navigation
|    └── scripts.html               # jQuery, plugins, GA, etc
├── _layouts
|    ├── page.html                  # page layout
|    ├── page.html                  # post-index layout used on home page
|    └── post.html                  # post layout
├── _posts
├── _sass                           # Sass partials
├── assets
|    ├── css                        # compiled stylesheets
|    ├── js
|    |   ├── _main.js               # plugin options
|    |   ├── scripts.min.js         # concatenated and minifed site scripts
|    |   ├── plugins                # plugin scripts
|    └── └── vendor                 # jQuery and Modernizr scripts
├── images                          # images for posts and pages
├── _config.yml                     # Jekyll options
├── about/                          # about page
├── posts/                          # all posts
├── tags/                           # all posts grouped by tag
└── index.html                      # home page with pagination
{% endhighlight %}

---

## Customization

Most of the variables found here are used in the .html files found in `_includes` if you need to add or remove anything. A good place to start would be to add the `title`, `description`, and `url` for your site. Links are absolute and prefixed with `{{ "{{ site.url " }}}}` in the various `_includes` and `_layouts`, so remember to properly set `url`[^1] to `http://localhost:4000` when developing locally.

### Disqus Comments

Create a [Disqus](http://disqus.com) account and change `disqus_shortname` in `_config.yml` to the Disqus *shortname* you just setup. By default comments appear on all post and pages if you assigned a shortname. To disable commenting on a post or page, add the following to its YAML Front Matter:

{% highlight yaml %}
comments: false
{% endhighlight %}

### Social Share Links

To disable Facebook, Twitter, and Google+ share links on a post or page, add the following to its front matter:

{% highlight yaml %}
share: false
{% endhighlight %}

### Owner/Author Information

Change your name, and avatar photo (200x200 pixels or larger), email, and social networking URLs. If you want to link to an external image on Gravatar or something similar you'll need to edit the path in `navigation.html` since it assumes it is located in `/images`.

### Google Analytics and Webmaster Tools

Your Google Analytics ID goes here along with meta tags for [Google Webmaster Tools](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=35179) and [Bing Webmaster Tools](https://ssl.bing.com/webmaster/configure/verify/ownershi) site verification.

### Navigation Links

To add additional links in the drop down menu edit `_data/navigation.yml`. Use the following format to set the URL and title for as many links as you'd like. *External links will open in a new window.*

{% highlight yaml %}
- title: Portfolio
  url: /portfolio/

- title: Made Mistakes
  url: http://mademistakes.com  
{% endhighlight %}

---

## Adding New Content with Octopress

While completely optional, I've included Octopress and some starter templates to automate the creation of new posts and pages. To take advantage of it start by installing the [Octopress](https://github.com/octopress/octopress) gem if it isn't already.

{% highlight bash %}
$ gem install octopress
{% endhighlight %}

### New Post

Default command

{% highlight bash %}
$ octopress new post "Post Title"
{% endhighlight %}

Default works great if you want all your posts in one directory, but if you're like me and want to group them into subfolders like `/posts`, `/portfolio`, etc. Then this is the command for you. By specifying the DIR it will create a new post in that folder and populate the `categories:` YAML with the same value.

{% highlight bash %}
$ octopress new post "New Portfolio Post Title" --dir portfolio
{% endhighlight %}

### New Page

To create a new page use the following command.

{% highlight bash %}
$ octopress new page new-page/
{% endhighlight %}

---

### Jekyll _includes

For the most part you can leave these as is since the author/owner details are pulled from `_config.yml`. That said you'll probably want to customize the copyright stuff in `footer.html` to your liking.

### Reading Time

On by default. To turn off remove `reading_time` from `_config.yml`. Default words per minute is set at 200 and can changed by updating `words_per_minute` in `_config.yml`.

### Feature Images

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

By default the `<div>` containing feature images is set to have a minimum height of 400px with CSS. Anything taller is hidden with an `overflow: hidden` declaration. You can customize the height of the homepage feature image and those appearing on posts/pages by modifying the following variables in `/_sass/_variables.scss`.

{% highlight sass %}
$feature-image-height: 400px; // min 150px recommended
$front-page-feature-image-height: 400px; // min 150px recommended
{% endhighlight %}

#### Post/Page Thumbnails for OG and Twitter Cards

Post and page thumbnails work the same way. These are used by [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) meta tags found in `head.html`. If you don't assign a thumbnail the image you assigned to `site.owner.avatar` in `_config.yml` will be used.

Here's an example of what a tweet to your site could look like if you activate Twitter Cards and include all the metas in your post's YAML.

![Twitter Card summary large image screenshot]({{ site.url }}/images/twitter-card-summary-large-image.jpg)

### Videos

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Adding YouTube video embeds causes errors when building your Jekyll site. To fix wrap the html within `{::nomarkdown}` tags. Example below:

{% highlight html %}
{::nomarkdown}
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0" allowfullscreen></iframe>
{:/nomarkdown}
{% endhighlight %}

### Twitter Cards

Twitter cards make it possible to attach images and post summaries to Tweets that link to your content. Summary Card meta tags have been added to `head.html` to support this, you just need to [validate and apply your domain](https://dev.twitter.com/docs/cards) to turn it on.

### Link Post Type

Link blog like a champ by adding `link: http://url-you-want-linked` to a post's YAML front matter. Arrow glyph links to the post's permalink and the the `post-title` links to the source URL. Here's an [example of a link post]({{ site.url }}/sample-link-post/) if you need a visual.

---

## Further Customization

Jekyll 2.x added support for Sass files making it much easier to modify a theme's fonts and colors. By editing values found in `_sass/variables.scss` you can fine tune the site's colors and typography.

For example if you wanted a red background instead of white you'd change `$bodycolor: #fff;` to `$bodycolor: $cc0033;`.

To modify the site's JavaScript files I setup a Grunt build script to lint/concatenate/minify all scripts into `scripts.min.js`. [Install Node.js](http://nodejs.org/), then [install Grunt](http://gruntjs.com/getting-started), and then finally install the dependencies for the theme contained in `package.json`:

{% highlight bash %}
npm install
{% endhighlight %}

From the theme's root, use `grunt` to concatenate JavaScript files and optimize `.jpg`, `.png` and `.svg` files in the `images/` folder.

You can also use `grunt dev` in combination with `bundle exec jekyll serve` to watch for updates in JS files that Grunt will then automatically re-build as you write your code, which will in turn auto-generate your Jekyll site when developing locally.

---

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub Issue](https://github.com/mmistakes/hpstr-jekyll-theme/issues/new). And if you make something cool with this theme feel free to let me know.

---

## License

This theme is free and open source software, distributed under the [MIT License]({{ site.url }}/LICENSE) version 2 or later. So feel free to to modify this theme to suit your needs.

---

[^1]: Used to generate absolute URLs in `feed.xml`, and for canonical URLs in `head.html`. Don't include a trailing `/` in your base url ie: http://mademistakes.com. When developing locally I suggest using http://localhost:4000 or whatever localhost you're using to properly load all theme stylesheets, scripts, and image assets. If you leave this variable blank all links will resolve correctly except those pointing to home.

[^2]: If you're using GitHub Pages to host your site be aware that plugins are disabled. So you'll need to build your site locally and then manually deploy if you want to use this sweet plugin.
