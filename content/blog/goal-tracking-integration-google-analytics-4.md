---
date: 2024-01-16T22:03:35.416Z
title: Goal tracking integration with Google Analytics 4
slug: goal-tracking-integration-google-analytics-4
tags:
  - news
category: How to
category_top_level:
  - Advertisers
author: Micheal George
thumbnail: /blog/assets/google-analytics-4-tracking-integration.png
big_picture: /blog/assets/short-1-.png
popularity: "0"
meta_title: ""
meta_description: ""
meta_keywords: ""
json_ld: ""
---
## What is Google Analytics?

Google Analytics is a free web analytics service offered by Google that tracks and reports website traffic, currently as a platform inside the Google Marketing Platform brand.

Google Analytics lets you measure your advertising ROI as well as track your video, and social networking sites and applications.

## What do you need to complete the integration?

1. A hosted website
2. GA account
3. A-ADS Account
4. A-ADS campaign with goal tracking enabled



## Let’s start!

Please note, steps one to four are to be ignored if you already use GA.

1. Go to  <https://analytics.google.com/>

![](https://lh7-us.googleusercontent.com/tVcQ2iYKQeoCKf-z4QPgQHyA1Y1eHYdH8_fhqhkcWLTjNNT2-jcCYFxNaX6MsFBcHQ_G7STfeOEHWf5Vi_xlH50K1I4-G5SmJ78OSL-8mVR14wl0lIoTk8NwoBWagMAEbwGULkPMB0moESv6vgoCmd4)

2. Click “Set up for free”.
3. Fill the form, and click the “Create” button.

![](https://lh7-us.googleusercontent.com/z3awPjHrqjmwEtVuSwR0rXRwSML7t02dRMMhJ43lAzTjYJYp8vgDUTGebruVdyN0bsaHDkmbK2g0EI4Wkfdoet5M2yN2X8Kc0wbanTgZL_VOLoMUA3yw8UFiFjlVG3ljCmBxWvbZMpNfizStPw7M02I)

4. Copy and paste the tracking code into your website
5. Go to <https://a-ads.com/> 
6. Create a new campaign, or go to your existing campaign’s dashboard
7. Enable goal tracking, as seen in the image below

![](https://lh7-us.googleusercontent.com/Sf4-RKa4F5XBDJpXU9yOygRhOvF6JdLYbLse6M1rMMY3KTN8BFAI36z1nsiz2Mhd0uoJakyfLredXEdArMAc56lH1M6Cd401jY2F5RyF3II7AZJU9OTEPX8OhzQin8IYdIdp0Ne5DLGuvvEEOROH7Ao)

8. Change the default suffix to “?utm_source=A-ADS&utm_medium=Banner&utm_campaign=MyCampaignName&utm_term={{partner}}”,  as seen in the image below.

![](https://lh7-us.googleusercontent.com/gavcwM67l4mom14uOCrefu6_OmvxNAJqiAA_ahQhsP9JEtiHKyF_MdXrFXoTXQsuVNeyuxCsg6FYFN-ot-alsWThV-2kBFfnYf2i97GFmoole3JF83jwem3Jg5UC3wk7xNjf6hYr8ZprkR_gG1dU_8Y)

The breakdown of the Suffix :

Utm_source = A-ADS

Utm_medium = Banner

Utm_Campaign = MyCampaignName

Utm_term = {{partner}}

9. After your A-ADS campaign starts running and has generated clicks, go to “Advertising>>All Channels” of your GA dashboard. The data should look something like this:

![](https://lh7-us.googleusercontent.com/qcLrhuKCmV5Yp7Gg97hyLS3QjoSGqVGB8OZngcOA87j7CnZKZc3A-abIUCAcKCGoaQXk_7K3FQz50M-lcAKltH64bNVc2VVto15Mwyso9zZO1Mb50Fx-QTwE5WHEc2PbgZX8FBSXHE8U070j52PEj7Q)

Note: The dimensions available in this report apart from the “Default channel group” are limited to

* Source platform = Utm_source_platform
* Source = Utm_source
* Medium= Utm_medium
* Campaign= Utm_Campaign

What is a “dimension” in Google Analytics?

Browser, Landing Page, and Campaign are all examples of default dimensions in Analytics.

A dimension is a descriptive attribute or characteristic of an object that can be given different values.

See [here](https://support.google.com/analytics/answer/1033861?hl=en#zippy=%2Cin-this-article) for more info.

…

At this point, you’ve successfully set up tracking, feel free to experiment with our tracking tokens, and choose what works best for you.\
Regarding other UTMs and their data, you’d need to generate “custom reports” to see them in GA4, the dimension names can be found [here](https://support.google.com/analytics/answer/11242870?hl=en)

All Done!