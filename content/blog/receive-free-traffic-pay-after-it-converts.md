---
date: 2020-05-04T06:31:12.074Z
title: Receive free traffic, pay after it converts
slug: receive-free-traffic-pay-after-it-converts
tags: []
category: How to
category_top_level:
  - Advertisers
  - Guides
author: Olga Ostrovskaya
thumbnail: ""
big_picture: ""
popularity: "0"
meta_title: Receive free traffic, pay after it converts
meta_description: We deliver some of traffic for free, in return you need to
  track and reward publishers that bring customers to you.
meta_keywords: ""
json_ld: ""
---
In order to better monetize our publishers' traffic we are willing to deliver some of it for free! What we need in return is your commitment to track and reward publishers that bring customers to you.\
If you want to receive free traffic, please follow these instructions:

1. [Create an advertising campaign](https://a-ads.com/campaigns/new?partner=63830) with a daily budget of 0
2. In campaign's settings enable **Goal tracking** and customize URL **Suffix** as you need.

   > [](<>)Upon each click on your ad we will replace **{{partner}}** in the URL **Suffix** with identifier of the form **<campaign id>_<ad unit id>** (campaign belongs to advertiser, ad unit belongs publisher).\
   > \
   > E. g. if your campaign #*12345* promotes the site *http://example.org*  and your URL suffix is set to *?partner={{partner}}* then a click from ad unit #*678910* will redirect the visitor to *http://example.org?partner=12345_678910*.\
   > \
   > The tracking system on your side should be able to track it in order to reward the publisher if this visitor does something useful for you (e. g. signs up or makes a purchase).
3. Implement a call to our API that should happen when visitors do something useful on your site, e. g. sign up or make a purchase (or[ ](mailto:contact@a-ads.com)contact us to discuss other forms of integration).

   > The API is dead simple, it is just a plain HTTP call of the form:\
   > \
   > **https://a-ads.com/api/v1/goals/create.json?unique_id=&password=&amount=&partner=&duration=&comment=**
   >
   > Where
   >
   > * **unique_id** - arbitrary ID you use to distinguish your rewards. Our system won't allow to create multiple rewards with same unique_id for a single campaign.
   > * **password** - just a password for your campaign (make sure you use HTTPS!)
   > * **amount** - size of reward in satoshis, e. g. 1000000 is 0.01 btc
   > * **partner** - identifier of the form <campaign_id>_<ad_unit_id>, it identifies both the reward sender (campaign) and the reward receiver (ad unit). Please don't confuse ads (advertisers' creatives) and ad units (publisher's traffic sources)!
   > * duration - (optional, default: 2592000) amount of seconds during which your reward will be gradually paid to ad unit thus increasing your share of its impressions.
   > * comment - (optional) public comment\
   >   \
   >   This API call instructs us to instantaneously deduct **amount** from your campaign's balance and send it to the specified ad unit in small portions during **duration** seconds. Please note that we additionally charge 25% on top of **amount** as fees.
4. Let us know that you are ready by writing an email to support@a-ads.com
5. Receive free traffic from our publishers, reward them and get more traffic for free, a [positive feedback](http://en.wikipedia.org/wiki/Positive_feedback) loop!

Please note that this offer is valid only for advertisers whom we consider trustworthy, and it is up to us to decide how much traffic we deliver for free. If you want to get more traffic - please deposit funds and increase the daily budget of your campaign.