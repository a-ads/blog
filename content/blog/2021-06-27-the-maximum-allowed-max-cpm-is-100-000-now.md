---
date: 2021-06-27T13:34:07.916Z
title: 'The maximum allowed "Max CPM" is $100,000 now'
tags:
  - news advertiser
category: Development
thumbnail: ''
big_picture: ''
---
# What is "Max CPM"?

`Max CPM` is a parameter of the Cost-Per-Day (aka Daily budget) advertising campaign that works as a filter: it excludes the traffic sources with expensive traffic from the campaign's targeting.

If `Max CPM` is not specified, the default value is used, which works fine in a normal situation and protects the advertisers from overpaying for traffic.

However, when multiple big advertisers compete for a single site, they may raise its CPM, thus effectively excluding it from their campaigns' targeting.

# Isn't $100,000 too much?

`Max CPM` is not the traffic price - it is a filter. If you do not want to filter out ad units by CPM, you can set it to the maximum allowed value.

Due to a way [how we measure traffic](https://a-ads.com/blog/2018-10-04-counting-unique-impressions/), CPM is not a good metric at A-ADS: one IP address can generate only one unique impression in the scope of the whole advertising network per day. So if there are multiple ad units on the same page, the first one will get most of the unique impressions, and the last one may appear to have an insanely high CPM.

It appears that some advertisers are ready to pay over $10,000 per thousand of unique impressions, so we decided to increase the maximum allowed value to $100,000.

# Why is there even a limitation for "Max CPM"?

It is a sanity check to protect our advertisers from misconfiguring their campaigns. A few months ago, we thought that an over $100 value could be there only by mistake. But since some advertisers are willing to pay more, we have been gradually increasing it (10x at a time).
