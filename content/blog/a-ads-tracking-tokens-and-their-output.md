---
date: 2021-03-15T08:23:02.309Z
title: A-ADS Tracking Tokens and Their Output
slug: a-ads-tracking-tokens-and-their-output
tags:
  - advertiser
category: How to
category_top_level:
  - Advertisers
  - Guides
category_second_level:
  - How To
author: Yulia Savushkina
thumbnail: /blog/assets/full-4-.png
big_picture: /blog/assets/short-14-.png
---
Firstly, info on "Goal tracking" and how to switch it on [here](https://a-ads.com/blog/2019-10-16-advertisers-why-do-i-need-goal-tracking-how-to-switch-it-on/).\
Most, or all of our tracking tokens are self-explanatory but for elaboration and easy understanding the following article will briefly explain the values of the tokens.

\* `{{partner}}`

This token is the most popular, and to some users, the most important, it denotes {campaign\_ID}\_{ad_unit_ID}.

e.g. `12345_67890`

Where 12345 is equal to campaign ID and 67890 is equal to ad unit ID.

\* `{{timestamp}}`

This token indicates the exact time the ad was clicked. This is simple [Unix time](https://en.wikipedia.org/wiki/Unix_time)

E.g. `1613148215`

You can convert the value to normal time using [Epoch converter](https://www.epochconverter.com/)

\* `{{device_type}}`

This token states the type of device that made the click. Available device types: 'Desktop', 'Mobile', 'Tablet' and 'Other'.

E.g. Desktop.

\* `{{browser_name}}`

This token states the name of the browser that made the click. Available browser names: 'Android Browser', 'Internet Explorer', 'Microsoft Edge', 'Google Chrome', 'Mozilla Firefox', 'Opera', 'Samsung Browser', 'UC Browser', 'Apple Safari', 'Yandex Browser', 'Other'.

E.g. Google Chrome.

\* `{{os_name}}`

This token states the name of the operating system that made the click. Available os names: 'Android', 'Chrome OS', 'iOS', 'GNU/Linux', 'Mac', 'Windows', 'Other'.

E.g. `Windows`

\*  `{{os_version}}`

This token states the version of the operating system that made the click.

E.g. `10`

\* `{{http_country_code}}`

This token states the country code from which the click was made. Here are [available country codes](https://dev.maxmind.com/geoip/legacy/codes/iso3166/).

E.g. `US`

\* `{{http_accept_language}}`

This token states the browser language from which the click was made.

E.g. `en-US`

[More info](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language).

\* `{{ip_address}}`

This token states the IP address from which the click was made.

E.g. `127.128.129.130`

\* `{{ad_unit}}`

This token states the ad unit that is responsible for referring the user that made the click.

E.g. `1410509`

\* `{{banner_size}}`

This token states the size of the banner that was clicked.

E.g. `728x90`
