---
date: 2019-07-04T17:37:38.866Z
title: You see "HTML code not found" error - what next?
tags:
  - ''
category: How to
thumbnail: /blog/assets/illustration-1-2x.png
---
So, you’ve got an error message saying that your ad unit code is not found. This error seriously reduces your earnings and needs to be fixed. 

![](/blog/assets/pasted-image-1.png)

We normally show one more info message below this one. It describes the reason why your ad unit is not found. Here’re the most popular problems and possible fixes:

## <a id="timeout-error"></a>Timeout error

![](/blog/assets/232a78d6-f480-4c2a-9b61-eb40ecaab1a4.jpeg)

Your site takes too long to respond. 

## <a id="unavailable-site"></a>Unavailable site

![](/blog/assets/5af669c8-fbfb-426e-bb7a-621b16b7925f.jpeg)

Your site cannot be loaded with a browser at all, e.g. it might be offline.

## <a id="page-cannot-be-loaded"></a>Page cannot be loaded

![](/blog/assets/img_2077.jpg)

The error appears when a website can be opened in a browser, but its source code cannot be analyzed by our bot program because of incorrect site settings. The possible reasons are as follows:

* a site page keeps reloading;
* a site has an endless page;
* a site database is not configured;
* a domain name is not registered;
* a site forbids VPN, proxy, Tor, etc.

## <a id="redirecting-to-another-website"></a>Redirecting to another website

![](/blog/assets/img_2078.jpg)

An ad unit must be present on the URL specified for it on the ad unit page. You get the “Redirecting to another website” error, if this URL redirects to some other domain. 

To fix the error you can either remove redirect, or change the URL of the ad unit on the ad unit page at a-ads.com. You can edit the ad unit URL via the link on the ad unit page:

![](/blog/assets/pasted-image-2.png)

Mind, if your ad unit had been found on the old URL before, you won’t be able to change the URL yourself, you’ll need help from our support team to do it.

If you cannot fix the problem, just abandon this ad unit and create a new one. :)

## <a id="missing-url"></a>Missing URL

![](/blog/assets/73ea60b2-c6b0-4214-972f-b5891bf93445.jpeg)

This error appears if src attribute of the iframe tag is absent or is empty. This can happen e.g. if you have edited your ad unit code and occasionally removed the src attribute. 

In case you add a URL into src attribute with JavaScript, it’s possible that it is not added in due time, so the bot will define the URL as empty.

A correct src attribute looks like this:

![](/blog/assets/pasted-image-3.png)

## <a id="invalid-url"></a>Invalid URL

![](/blog/assets/3aea5d01-9b1e-4840-96b3-f7075f4ec1e3.jpeg)

Attribute src should contain a normalized URL. If a URL is not normalized, you’ll get this error message. 

You can check if the URL is correct by copy-pasting it into browser address bar - a banner should be displayed. E.g. you copy this:

![](/blog/assets/unnamed.png)

And see a banner:

![](/blog/assets/снимок-экрана-2019-07-08-в-1.35.29.png)

So the URL in the src attribute is correct.

Here are examples of invalid URLs:

![](/blog/assets/снимок-экрана-2019-07-08-в-1.35.46.png)

![](/blog/assets/снимок-экрана-2019-07-08-в-1.36.08.png)

![](/blog/assets/снимок-экрана-2019-07-08-в-1.36.16.png)

![](/blog/assets/снимок-экрана-2019-07-08-в-1.36.29.png)

The last URL is also invalid, because it contains space symbols and an ad cannot be loaded for this reason.

## <a id="alert-or-pop-up-message-is-blocking-your-ad"></a>Alert or pop-up message is blocking your ad

![](/blog/assets/снимок-экрана-2019-07-08-в-1.52.37.png)

The bot normally can verify an ad unit in spite of alert, confirm and prompt windows on your site page. In cases when it cannot cope with this sort of pop-up, you get this error. 

Pop-ups blocking a banner might look like this:

![](/blog/assets/16.png)

![](/blog/assets/17.png)

## <a id="ad-is-not-fully-visible"></a>Ad is not fully visible

![](/blog/assets/снимок-экрана-2019-07-08-в-1.53.26.png)

You get this message if an ad on your site is not fully visible. A banner is present in the site code, but is partly or fully hidden by some other page elements. If banners overlap each other, you’ll get this error too.

![](/blog/assets/снимок-экрана-2019-07-08-в-1.54.45.png)

![](/blog/assets/снимок-экрана-2019-07-08-в-1.54.59.png)

If you place a floating ad that can be closed, the “Close” button should not overlap it, else you’ll also get this error. Here is an example of proper placement of a button: 

![](/blog/assets/снимок-экрана-2019-07-08-в-2.37.01.png)

And here is a wrong way: 

![](/blog/assets/снимок-экрана-2019-07-08-в-2.37.21.png)

The “Ad is not fully visible” error might also be caused by a pop-up window which appears while loading a site. Prompt, alert and confirm windows normally don't cause an error or cause another error. :)

If you can avoid using pop-up ads, you’d better not used them at all. 

One more probable reason for the error is that your banners are loaded later than your site.

If the ad unit on your site is placed correctly but doesn’t appear immediately after loading, our bot may consider it invisible, blocked by another element, inaccessible for clicks or not detected at all. In this case, please, contact our support team - we’ll fix the error.

## <a id="ad-is-unclickable"></a>Ad is unclickable

![](/blog/assets/2e8f314a-49ed-447e-a069-0546347f010d.jpeg)

A banner must be clickable. A click must lead to the advertised site. If nothing happens after a click, or if it leads to some other site, the error appears.

## <a id="invalid-domain"></a>Invalid domain

![](/blog/assets/6e0c068f-2dbb-4310-8bd4-b5650e71060c.jpeg)

The src attribute must contain one of a-ads.com domains. On the moment two domains are allowed: ad.a-ads.com and acceptable.a-ads.com . If the src attribute contains any other domain, you’ll get this message.

## <a id="empty-data-aa"></a>Empty data-aa

![](/blog/assets/снимок-экрана-2019-07-08-в-1.58.21.png)

The error appears if there’s no data-aa attribute in the iframe. A correct iframe with data-aa attribute looks like this:

![](/blog/assets/снимок-экрана-2019-07-08-в-1.59.06.png)

An erroneous iframe:

![](/blog/assets/снимок-экрана-2019-07-08-в-1.59.22.png)

## <a id="empty-id"></a>Empty ID

![](/blog/assets/снимок-экрана-2019-07-08-в-2.00.20.png)

An ad unit ID must be present in the src attribute of the iframe tag in your site source code. The ID is expected to be after the first slash sign “/” following the domain (ad.a-ads.com or acceptable.a-ads.com). A correct code piece looks like:

![](/blog/assets/empty1.5.png)

This one is incorrect, because an ID is absent in src attribute:

![](/blog/assets/empty2.png)

An ID is also expected to be before the next slash or further params, e.g. “?size=240x400”. That’s why ID is regarded empty in the following case as well:

![](/blog/assets/empty3.png)

## <a id="invalid-id"></a>Invalid ID

![](/blog/assets/снимок-экрана-2019-07-08-в-2.01.52.png)

This error means you’ve got one ad unit ID in the src attribute and another ID in the data-aa attribute in the iframe tag embedded into your site source code.

![](/blog/assets/снимок-экрана-2019-07-08-в-2.01.58.png)

## <a id="size-doesn-t-match"></a>Size doesn’t match

An ad unit can be adaptive or have a fixed size. 

The minimum allowed size for an adaptive ad unit is 120x25 px. If a banner on your site page is less, you’ll get an error message:

![](/blog/assets/9098201a-1076-4acf-8af6-00cd2239ea75.jpeg)

If your ad unit is a fixed size one, the banner on your site page should match ad unit exact size, else you’ll get an error message:

![](/blog/assets/145fb995-cb0f-4725-b7cb-061f222e5885.jpeg)

To fix the error you should adjust an actual size of a banner with the requirements.The required size for your banner is present in the text of the error message (the second size of the two). The first size in the error message will be an actual size of a banner on your site.

## <a id="unknown-error"></a>Unknown error

![](/blog/assets/07dfcb2d-29d9-43fc-8942-2b59fb4c47a0.jpeg)

An unexpected error occurred and we cannot identify its origin. It might disappear on its own or it might remain, then you should contact our helpdesk.

## <a id="conclusion"></a>Conclusion

If the issue is likely to be on your side, we encourage you to find the solution before you address the support. You can run our bot after you've fixed the issue to see if the error disappeared.

![](/blog/assets/tyl1.png)

If an ad unit code is placed on your site in accordance with the specified requirements, and our bot still cannot find it, please, contact our support team and we will eagerly help you.
