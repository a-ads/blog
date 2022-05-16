---
date: 2022-05-13T07:56:22.563Z
title: Tracking Integration With Binom
tags:
  - advertiser
category: How to
thumbnail: /blog/assets/a-ads-blog-img-2-.jpg
big_picture: /blog/assets/360х360.jpg
---
## What is Binom?

[Binom ](https://binom.org/)is an affiliate tracker for efficient traffic planning and management. The solution itself was designed and developed by a group of experienced digital marketing experts whose intention was to create an outstanding tool. A tool any affiliate marketer could use to run a profitable campaign in any niche or any country. 

## Integration Instructions

**Prerequisites:** 

● Binom account 

● A-ADS account 

● A-ADS campaign with goal tracking enable 

**Let's start!** 

**1. Create a traffic source in Binom.** 

Go to the Traffic sources tab 

Click the “Create” button 

Click the “Load from template” button 

Then, search and click “A-ADS” 

![](/blog/assets/binom1.png)

Then, click “Save”

![](/blog/assets/binom2.png)

● You can change or adjust (if necessary) any option in the “New traffic source” form. Once you have done so, click the “Save” button. Note: “{{partner}}” should remain in “Token 1” 

**2. Create a new offer in Binom**. 

Go to the “Offers” tab 

Click the “Create” button 

Fill out the form as applies to you 

![](/blog/assets/binom3.png)

After that, click “Save” 

If you need more info on “Offers”, please go [here](https://docs.binom.org/manage-offers.php). 

**3. (Optional) Create a Landing page. Learn how to create one** [**here**](https://docs.binom.org/manage-landers.php)**.** 

**4. Create a campaign in Binom with your earlier created traffic source and offer.** 

Go to the “Campaigns” tab 

Click the “Create” button 

Fill out the form as applies to you with the A-ADS traffic source, and the offer that you created earlier

![](/blog/assets/binom4.png)

**5. Log into your A-ADS account.** 

**6. Enable Goal tracking for your campaign at A-ADS as seen in the image below, if you don't have a  campaign you can create one** [**here**](https://a-ads.com/campaigns/new)**.** 

![](/blog/assets/binom5.png)

**7. Configure your A-ADS campaign.**

\
Set your A-ADS campaign ad link to your Binom campaign URL without the “?” and everything after it.

For example: http://tracker.binomsite.com/click.php?key=jsu8xyskjply0it1oim4

Then set your A-ADS campaign’s "Goal Tracking" "suffix" to the “?” and everything after.

For example:

```
“?partner={{partner}}&device_type={{device_type}}&browser_name={{browser_name}}&os_name={{os_name}}&http_country_code={{http_country_code}}&http_accept_language={{http_accept_language}}&ip_address={{ip_address}}&ad_unit={{ad_unit}}&banner_size={{banner_size}}&external_id={{timestamp}}?partner={{partner}}&device_type={{device_type}}&browser_name={{browser_name}}&os_name={{os_name}}&http_country_code={{http_country_code}}&http_accept_language={{http_accept_language}}&ip_address={{ip_address}}&ad_unit={{ad_unit}}&banner_size={{banner_size}}&external_id={{timestamp}}&os_version={{os_version}}”
```

As seen in the image below:

![](/blog/assets/binom6.png)

Then save your campaign.

You can check the statistics on campaign performance simply by clicking “Stats”

![](/blog/assets/binom7.png)

Statistics should look something like the image below, based on your settings: 

![](/blog/assets/binom8.png)

All Done!
