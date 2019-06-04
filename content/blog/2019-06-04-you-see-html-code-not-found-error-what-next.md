---
date: 2019-06-04T08:23:12.407Z
title: You see "HTML code not found" error - what next?
tags:
  - news
category: How to
thumbnail: /blog/assets/b052e709-1c8f-45bd-908d-967e51935a7d.png
---
So, you’ve got a nasty yellow message saying your ad unit code is not found on the page. This error seriously reduces your earnings and needs to be fixed. 

![](/blog/assets/15c025d7-4369-4710-8c43-d4c952ce073a.jpeg)

We normally show one more info message below this one. Click on the « Check embedded HTML code » and it it’s possible to identify the reason, it will appear in the second message. It describes the reason for your ad unit not to be found. Here’re the most popular problems and possible fixes:

**Missing URL**

The a-ads URL should be present in the source attribute of the iframe tag on your site. Our bot cannot see it when checking your site code. What it looks for is:

![](/blog/assets/6c742044-92d2-4300-9a3f-a9d74bf605e2.jpeg)

 Please fix the issue yourself or write to our helpdesk if you face difficulties.

**Invalid domain**

![](/blog/assets/6e0c068f-2dbb-4310-8bd4-b5650e71060c.jpeg)

The domain in the src attribute belongs to another website. If the domain is not identified as one of A-Ads (ad.a-ads.com and acceptable.a-ads.com), you can get this message. In case you add the URL with javascript, it is possible that the URL is not added in due time and the bot will define the URL as empty, which results in the same error.

**Invalid URL**

![](/blog/assets/3aea5d01-9b1e-4840-96b3-f7075f4ec1e3.jpeg)

Iframe tag has an attribute “src”, in which the ads’ URL has to be present. This address contains the ID of the ad unit. Two domains can be utilized there at the moment: ad.a-ads.com and acceptable.a-ads.com. The ID in the URL has to coincide with the ID placed in the “data-aa” attribute.

**The alert or pop-up message are blocking your ad**

![](/blog/assets/19e3b5b0-ecd9-450a-8cda-3492513a3eb9.jpeg)

The ad has to be visible. If an advertisement is hidden somewhere inside your page and is not displayed to users, then we consider such an advertisement not found. Sometimes advertising does not appear immediately, this can also be the reason why advertising will be considered invisible.

**The ad is blocked by other elements**

![](/blog/assets/5e175144-feed-45a6-a821-7130360a514c.jpeg)

Advertising should not overlap with each other. If it is partially blocked by some HTML element, then we consider such advertising as not found. If a pop-up window appears when your website loads, which is not an alert, prompt, or confirm types, then there may be problems with identifying it.

**The ad is not fully visible**

![](/blog/assets/c19fe45c-ef27-4831-b131-648ffee5c453.jpeg)

If you place a floating ad that can be closed, the control element for closing the ad, should not overlap it. Here is an example of proper placement of floating advertising: 

![](/blog/assets/97069c55-e2b8-4184-8e34-347468684f9d.jpeg)

And this is the wrong way: 

![](/blog/assets/cd6ae4bf-6e95-4fc8-a2c5-6598aace5e80.jpeg)

Anyway, it is better not to use pop-up ads, because they can overlap other banners.

**The ad is not available for clicks**

![](/blog/assets/2e8f314a-49ed-447e-a069-0546347f010d.jpeg)

Advertising must be clickable. If someone clicks on an advertisement, he should go to the advertiser's site. When this does not happen or the user is redirected to another site, we cannot consider such advertising as found.

**Size doesn’t match**

![](/blog/assets/145fb995-cb0f-4725-b7cb-061f222e5885.jpeg)

![](/blog/assets/9098201a-1076-4acf-8af6-00cd2239ea75.jpeg)

Advertising can be adaptive or with a fixed size. The minimum allowable size of responsive advertising is 120x25 px. The fixed size of the advertisement should match the size specified in the settings of your advertising space. If the “src” attribute of your iframe tag uses the acceptable.a-ads.com domain, then the advertisement is considered adaptive. If it uses ad.a-ads.com - it is a fixed-size ad.

**The site takes too long to respond or the timeout error**

![](/blog/assets/232a78d6-f480-4c2a-9b61-eb40ecaab1a4.jpeg)

Sometimes the ad takes too long to respond. If the ad unit on your site is placed correctly but doesn’t appear immediately upon loading, our bot may consider it invisible, blocked by another element, inaccessible for clicks or not detected at all. In this case, please contact your hosting provider to increase the timeout for your site and thereby solve the problem.

**The unavailable site**

![](/blog/assets/5af669c8-fbfb-426e-bb7a-621b16b7925f.jpeg)

The browser cannot load your page. This means that the issue appears on the publisher’s side. 

**Redirecting to other websites**

![](/blog/assets/373969a7-4d6b-4b73-831d-81ceee406640.jpeg)

Our bot is not able to track your ad code if opening of your webpage instantly leads to opening of other links. We do not allow redirects and if you want to earn anything, you need to use direct links instead.

**The page cannot be loaded**

![](/blog/assets/c4e47f59-aa12-4f12-b1b6-165029871b70.jpeg)

In this case the website can be opened in browser, but our browser API cannot analyze this website. There are numerous reasons for it, both on our side or the publisher’s, for example, if a website

* constantly renews
* has an endless page
* provides a non-valid HTML, when the hot tries to download the page
* forbids VPN, proxy, Tor, etc.

**Unknown error**

![](/blog/assets/07dfcb2d-29d9-43fc-8942-2b59fb4c47a0.jpeg)

The unexpected error occurred and we can not identify its reason.

It can disappear if you repeat the request or it may remain for a long time.

If it’s possible that the issue appears on your side, we encourage you to find the solution before you address the support. If the ad code is placed on your site in accordance with the specified requirements, and our software still cannot find it, then contact our support team and they will try to help you.
