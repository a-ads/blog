---
date: 2021-01-08T10:50:22.162Z
title: Cloudflare IP Whitelisting
slug: cloudflare-ip-whitelisting
tags:
  - publisher
category: How to
category_top_level:
  - Guides
category_second_level:
  - How To
author: Micheal George
thumbnail: /blog/assets/cloudflare-whitelisting-featured.png
big_picture: /blog/assets/cloudflare-whitelisting-square.png
meta_title: Cloudflare IP Whitelisting | AADS Blog
meta_description: Learn how to eliminate the "Cloudflare prevents our bot from
  accessing your site" error by whitelisting our IPs in your Cloudflare account.
  Follow these simple steps to ensure that your website can be accessed without
  any issues and improve your site's overall security.
---
If you are experiencing the “Cloudflare prevents our bot from accessing your site” error as seen in the image below.

![Cloudflare prevents our bot from accessing your site](../../static/assets/screenshot_5.png "Cloudflare prevents our bot from accessing your site")

It means that for some security reason Cloudflare is preventing our bots from accessing your site.

In order to eliminate this error, follow these steps below.

1. Login to your Cloudflare account.
2. Select the specified domain.
3. Navigate to Security >> WAF >> Tools as seen in the image below.

![Cloudflare IP access rules](../../static/assets/cloudflare.png "Cloudflare IP access rules")

4. Under “IP Access Rules”, add the IP addresses that you received from AADS support team.

Note : If you don’t have any of our bots IP’s, please contact our support.

5. Click “Check embedded HTML code” in your ad unit’s dashboard as seen in the image below.

![Check embedded HTML code](../../static/assets/cloudflare-whitelisting-4.png "Check embedded HTML code")

6. Wait a few minutes, reload the ad unit dashboard, the results should be like below.

![Cloudflare whitelisting successful](../../static/assets/cloudflare-whitelisting-5.png "Cloudflare whitelisting successful")

7. All done.
