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
thumbnail: /blog/assets/full-13-.png
big_picture: /blog/assets/short-3-.png
---
If you are experiencing the “Cloudflare prevents our bot from accessing your site” error as seen in the image below.

![](/blog/assets/screenshot_5.png)

It means that for some security reason Cloudflare is preventing our bots from accessing your site.

In order to eliminate this error, follow these steps below.

1. Login to your Cloudflare account.
2. Select the specified domain.
3. Navigate to Firewall >> Tools as seen in the image below.

![](/blog/assets/cloudflare-whitelisting-2.png)

4. Under “IP Access Rules”, add the IP addresses that you received from A-ADS support team like in the image below.

Note : If you don’t have any of our bots IP’s, please contact our support.

![](/blog/assets/cloudflare-whitelisting-3.png)

5. Click “Check embedded HTML code” in your ad unit’s dashboard as seen in the image below.

![](/blog/assets/cloudflare-whitelisting-4.png)

6. Wait a few minutes, reload the ad unit dashboard, the results should be like below.

![](/blog/assets/cloudflare-whitelisting-5.png)

7. All done.