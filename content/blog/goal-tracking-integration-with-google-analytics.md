---
date: 2020-10-23T14:03:30.203Z
title: Goal tracking integration with Google Analytics
slug: goal-tracking-integration-with-google-analytics
tags:
  - advertiser
category: How to
category_top_level:
  - Advertisers
  - Guides
category_second_level:
  - How To
author: Micheal George
thumbnail: ../../static/assets/full-11-.png
big_picture: ../../static/assets/short-9-.png
meta_title: Goal tracking integration with Google Analytics | A-ADS Blog
meta_description: Learn how to integrate goal tracking with Google Analytics and
  your A-ADS campaign. With just a hosted website, GA account, and an A-ADS
  account with goal tracking enabled, you can easily measure your advertising
  ROI and track your website traffic. Follow these simple steps to complete the
  integration.
---
## What is Google Analytics?

**Google Analytics** is a free web analytics service offered by Google that tracks and reports website traffic, currently as a platform inside the Google Marketing Platform brand.

**Google Analytics** lets you measure your advertising ROI as well as track your video, and social networking sites and applications.

## What do you need to complete the integration?

1. A hosted website
2. GA account
3. A-ADS Account
4. A-ADS campaign with goal tracking enabled.

**Let’s start!**

Please note, step one to step four is to be ignored if you already use GA.

1. Go to [analytics.google.com](https://analytics.google.com) 

![Google Analytics Intro](../../static/assets/google-analytics-intro.png "Google Analytics Intro")

2. Click “Set up for free”.
3. Fill the form, and click the “Create” button.

![google analytics create property](../../static/assets/google-analytics-create-propery.png "google analytics create property")

4. Copy and paste the tracking code into your website.
5. Go to [a-ads.com](https://a-ads.com) .
6. Create a new campaign, or go to your existing campaign’s dashboard.
7. Enable goal tracking, as seen in the image below.

![Goal tracking partner](../../static/assets/goal-tracking-partner.png "Goal tracking partner")

8. Change the default suffix to

`?utm_source=A-ADS&utm_medium=Banner&utm_campaign=MyCampaignName&utm_term={{partner}}`,  as seen in the image below.

![Goal tracking](../../static/assets/goal-tracking.png "Goal tracking")

**The breakdown of the Suffix:**

```
Utm_source = A-ADS
Utm_medium = Banner
Utm_Campaign = MyCampaignName
Utm_term = {{partner}}
```

9. After your A-ADS campaign starts running and has generated clicks, go to "Acquisition>>Campaigns>>All Campaigns" of your  GA dashboard.

![Google Analytics campaigns](../../static/assets/campaign-mycompaign.png "Google Analytics campaigns")

10. In most Google Analytics reports, you can see a row with Primary or  Default Dimension followed by several links. The last one is usually marked Other.

**What is “dimension” in Google Analytics?**

Browser, Landing Page, and Campaign are all examples of default **dimensions** in **Analytics**.

A **dimension** is a descriptive attribute or characteristic of an object that can be given different values.

11. Click on Other and then click Acquisition. Select “Keyword”, which corresponds to the value of utm_term.

![campaign acquisition keyword](../../static/assets/campaign-acquisition-keyword.png "campaign acquisition keyword")

12. Tracking info should look like the image below.

![Google Analytics campaign summary](../../static/assets/campaign-summary.png "Google Analytics campaign summary")

**All Done!**