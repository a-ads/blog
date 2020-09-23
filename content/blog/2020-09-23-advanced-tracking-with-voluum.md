---
date: 2020-09-23T13:53:40.381Z
title: Advanced Tracking with Voluum
tags:
  - advertiser
category: How to
thumbnail: /blog/assets/voluum______________feature.png
big_picture: /blog/assets/voluum______________square.png
---
[Voluum](https://voluum.com/partner/a-ads/) is an innovative, real-time analytics platform for tracking online campaigns. The system designed by Codewise is for the use of performance marketers and individual advertisers who want to monitor the progress and profitability of their campaigns.

![](/blog/assets/advanced-tracking-with-voluum-arsen-.png)

\* Voluum offers up to 37% discounts to A-ADS users, claim your discounts here. Track, manage, and optimize all your advertising campaigns in one place. Explore the powerful features and skyrocket your performance. 

See also [our article about Goal tracking](https://a-ads.com/blog/2019-10-16-advertisers-why-do-i-need-goal-tracking-how-to-switch-it-on/).

# Integration Instructions

## Prerequisites:

* Voluum account
* A-ADS account
* A-ADS campaign with goal tracking enabled

## Let’s start!

1. Create a traffic source (TS) element in Voluum. Voluum provides you with the A-ADS traffic source template, so you can use it and skip most of the manual setup. To use this template, perform the following steps:

* Go to the Traffic sources tab.
* Click the New traffic source button.

![](/blog/assets/15f5f1a36e61b0.png)

* Select the A-ADS template from the list of available templates.
* Click the Next button. The New traffic source form will appear.
* You can change or adjust (if necessary) any option in the New traffic source form. Once you are done, click the Save button.

![](/blog/assets/ts-source.png)

2. Create an offer element. Read the Creating an Offer Element article here, to learn how to do that.
3. (Optionally) Create a lander element. Read the Create a Lander Element article here, to learn more.
4. Create a campaign in Voluum with your earlier created traffic source element. If you don’t know how to create a campaign in Voluum, find out here.
5. Log into your A-ADS account.
6. Enable Goal tracking for your campaign at A-ADS as seen in the image below, if you don’t have a campaign you can create one here. 

![](/blog/assets/screenshot_from_2020-09-23_16-56-06.png)

You’ll probably want to use the `partner` parameter to track the traffic source that brought a visitor to your site, and you can also use more parameters available for tracking. You can add them too. 

![](/blog/assets/screenshot_from_2020-09-23_16-58-55.png)

Please note, each parameter/token in the “A-ADS Suffix” represents “Voluum’s TS parameter/token”, e.g.:

A-ADS’s goal tracking (GT)				Voluum’s traffic source (TS)

partner={{partner}}					        TS parameter = partner, TS token = {{partner}}

Suffix parameters/token in A-ADS and TS parameters/token in Voluum are correlated. 

7. If you use redirect tracking, please, set your campaign URL as your Voluum campaign URL, remove the “?”, and everything after.

All done!
