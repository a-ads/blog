---
date: '2018-10-04'
title: 'Publishers: how does our bot work for your own good'
tags:
  - news
category: How to
thumbnail: /blog/assets/illustration-5-2x.png
---
## OR: Why you should put the exact URL in your ad unit info.

Many users ask us [how to place an ad unit code correctly](https://a-ads.com/blog/2019-06-17-how-to-place-an-ad-unit-code-correctly/). They say that even though the URL is correct, the code is still not found. In many cases, we discover that the code is actually not present on the assigned page. Why you should care for it? Here we have gathered some useful explanations!

The bot looks for an ad unit at the specified URL. If an ad unit is found, all the impressions from all site pages from the specified URL domain and all its subdomains will be counted correctly. 

This means that if you've got an ad unit at `https://example.org/` (or at `https://example.org/page-with-ad`) and it's found by a bot, you can place this ad unit at pages like `https://good.example.org/`, `https://bad.example.org/super`, `https://example.org/private` (where only registered users can access), etc.
