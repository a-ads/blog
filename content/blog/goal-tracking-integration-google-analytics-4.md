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
meta_title: Goal Tracking Integration with Google Analytics 4 | AADS Blog
meta_description: Learn how to integrate goal tracking with Google Analytics 4
  for your AADS campaigns. Follow our step-by-step guide to set up tracking,
  analyze data, and optimize your advertising ROI.
meta_keywords: ""
json_ld: ""
---
## What is Google Analytics?

Google Analytics is a free web analytics service offered by Google that tracks and reports website traffic, currently as a platform inside the Google Marketing Platform brand.

Google Analytics lets you measure your advertising ROI as well as track your video, and social networking sites and applications.

## What do you need to complete the integration?

1. A hosted website
2. GA account
3. AADS Account
4. AADS campaign with goal tracking enabled

## Let’s start!

Please note, steps one to four are to be ignored if you already use GA.

Go to  [](https://analytics.google.com/)[analytics.google.com](https://analytics.google.com/) ﻿

![Google Analytics service](/blog/assets/welcome-to-google-analytics.webp)

Click “Set up for free”.

Fill the form, and click the “Create” button.

![GA Tracking Code](/blog/assets/ga-tracking-code.webp)

Copy and paste the tracking code into your website.

Go to ﻿﻿[aads.com](https://aads.com/).

Create a new campaign, or go to your existing campaign’s dashboard.

Enable goal tracking, as seen in the image below.

![Enable goal tracking](/blog/assets/enable-goal-tracking.webp)

Change the default suffix to “?utm_source=A-ADS&utm_medium=Banner&utm_campaign=MyCampaignName&utm_term={{partner}}”,  as seen in the image below.

![Change the default suffix](/blog/assets/changing-default-suffix.webp)

The breakdown of the Suffix:

Utm_source = A-ADS

Utm_medium = Banner

Utm_Campaign = MyCampaignName

Utm_term = {{partner}}

After your AADS campaign starts running and has generated clicks, go to “Advertising>>All Channels” of your GA dashboard. The data should look something like this:

![GA dashboard](/blog/assets/ga-dashboard.webp)

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