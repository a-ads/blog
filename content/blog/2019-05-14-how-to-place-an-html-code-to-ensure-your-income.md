---
date: 2019-05-14T07:52:00.190Z
title: How to place an HTML code to ensure your income?
tags:
  - news
category: How to
thumbnail: /blog/assets/illustration-6.png
---
## A comprehensive guide to allocating your ad unit on the website page

Banners have been used for advertising online for more than 2 decades. It is an effective tool yet simple and cheap. There is a certain skill in effectively using the banners on your website - depending on their size, format and content. People usually hate banners if they are too big, primitive, pop up out of nowhere and do not concern their needs. But before you go about making it attractive to the public you need to place it correctly. 

The success of A-ADS advertisers is very important to us, so we impose certain criteria for the ad unit to be fit for our network. Otherwise if you are a publisher you don’t earn anything.

Now, here’s how we do it in A-ADS.

After you have created a new advertising space and assigned it to a certain URL, you need to place the code on your page. You can find it on the right of the ad unit’s main page, in the section called “Code for your site”. What we consider a code is an iframe tag with a set of attributes.

We check if the code is presented on the assigned URL several times a day. If the code is not found, you will see the relevant message in yellow on your ad unit page. If it’s possible, our algorithm will also detect the reason for not being able to find the code. 

Here are some facts for you to know:

* If you require registration to enter the page, our bot will not be able to access it.
* Our program uses a VPN, so if you disallow the access through VPN, we will not be able to check the code presence.
* You can launch the checking of your code presence manually. Just click on « Check the embedded HTML code » and your page will be checked in 10 minutes time.
* Be aware that if you eliminate “data-aa” attribute from your phrase, the banner will not be found. We use this attribute to differentiate our banners from other HTML elements on the page. In other words, be careful if you make changes to the code.
* Another problem for checking may occur if you use Cloudflare and captcha at entering your website.
* Do not use different advertising space for different website layouts. At the moment, the code should be available for all layout types.

There are several very widespread reasons why the code is not found, so be sure you don’t fall into these categories:

* The code is on the different page of your website than you have put in the information. We expect the code to be exactly on the page, where it belongs. If you have put the wrong URL, you can always change it in the tab “Edit” of the ad unit main page.
* The code is on another website. There’s no point in using the same code for various websites as we define the traffic by the domain. If you still need to place the code on several websites, we suggest you use at least one ad unit per site.   
* Iframe tag has an attribute “src”, in which the ads’ URL has to be present. This address contains the ID of the advertising space. Two domains can be utilized there at the moment: ad.a-ads.com and acceptable.a-ads.com. The ID in the URL has to coincide with the ID placed in the “data-aa” attribute.
* The ad has to be visible. If an advertisement is hidden somewhere inside your page and is not displayed to users, then we consider such an advertisement not found. Sometimes advertising does not appear immediately, this can also be the reason why advertising will be considered invisible.
* Advertising should not be overlapped. If it is partially blocked by some HTML element, then we consider such advertising as not found. If a pop-up window appears when your website loads, which is not an alert, prompt, or confirmed types, then there may be problems with it.
* If you place a floating ad that can be closed, the control element for closing the ad, should not overlap it. Here is an example of proper placement of floating advertising: http://indexbitco.in/. And this is the wrong way: https://freenem.com/, https://www.gptplanet.com/, https://www.scarlet-clicks.info/. Still, it is better not to use pop-up ads, because they can overlap other banners.
* Advertising must be clickable. If someone clicks on an advertisement, he should go to the advertiser's site. When this does not happen or the user is redirected to another site, we can not consider such advertising as found.
* Advertising can be adaptive or with a fixed size. The minimum allowable size of responsive advertising is 120x25 px. The fixed size of the advertisement should match the size specified in the settings of your advertising space. If the “src” attribute of your iframe tag uses the acceptable.a-ads.com domain, then the advertisement is considered adaptive. If ad.a-ads.com - it is a fixed-size ad.
* If the ad unit on your site is placed correctly in but doesn’t appear immediately upon loading, our bot may consider it invisible, blocked by another element, inaccessible for clicks or not detected at all. In this case, please contact support to increase the timeout for your site and thereby solve the problem.

If the ad code is placed on your site in accordance with the specified requirements, and our software still cannot find it, then contact our support team and they will try to help you.
