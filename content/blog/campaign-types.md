---
date: 2020-07-01T12:14:18.807Z
title: Campaign types
slug: campaign-types
tags:
  - advertiser
category: Development
category_top_level:
  - Advertisers
  - Guides
author: Olga Ostrovskaya
thumbnail: ../../static/assets/undraw_select_option_y75iобложка.png
big_picture: ../../static/assets/undraw_select_option_y75iквадрат.png
---
## Overview

A-ADS offers three payment models: CPM (cost per mille), CPA (cost per action), and CPD (cost per day).

We used to allow mixing all of them in a single campaign, but for the sake of simplicity and better campaign management, we decided to move away from this approach.

Now, each campaign has only one payment model, which defines its type: CPM, CPA, or CPD. You can see it on the user dashboard.

## How to choose the campaign type?

You choose the payment model upon campaign creation.

### **Cost per day**

Our default payment model is CPD (cost per day): advertisers pay for the share of traffic of the targeted ad units.

We recommend this payment model because it has several advantages:

* your expenses and campaign pace are predictable and uniform;
* you control which ad units display your ads (and [you can check it](https://help.a-ads.com/en/article/how-can-i-see-my-ads-published-on-your-sites-y58ovh/));
* you don’t pay for fake traffic: publishers can’t deplete your budgets by faking impressions, and your competitors - by clicking your ads.

The major drawback of this payment model is the limited targeting capabilities, so it is most suitable for global advertising campaigns. Please see a more detailed explanation of CPD campaigns [here](https://a-ads.com/blog/2019-08-11-how-does-daily-budget-work/).

### **Cost per mille**

CPM (cost per mille) is probably the oldest payment model in the field of online advertising. It is pretty straightforward: advertisers set the price and amount of impressions they want to buy.

We recommend using this model only if you really need geo-targeting and carefully select the ad units for your campaign because we can not guarantee the quality of ad impressions.

Please note that traffic for CPM-campaigns is counted less strictly than for CPD-campaigns: we measure its uniqueness in the scope of a campaign (not the whole network). Read more about CPM campaigns [here](https://a-ads.com/blog/2020-03-11-how-to-use-cpm-bids-with-a-ads/).

### **Cost per action**

CPA and Revenue sharing campaigns enable advertisers to optimize their campaigns by rewarding the ad units that attract paying customers.

This option is available only to trusted advertisers who integrate with our server-to-server API.

If you want to create a CPA campaign, please fill in [this form](https://docs.google.com/forms/d/1W8ZqnXUIlQCi7lFoGMTGgiOtnnUtJUDLwaClA-Gu-9A/edit) and contact our support.

## Changing the payment model

Until you fund your campaign, you can switch from CPD to CPM, and vice versa, but you can’t do it after your campaign starts working.

A CPM campaign can only have one active bid, changing the CPM campaign to CPD will result in canceling it.

Editing a running CPM bid will result in its cancellation, creation of a new one, and automatic return of the unused money, which may take a few minutes.