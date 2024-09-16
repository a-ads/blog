---
date: 2023-09-25T13:16:42.496Z
title: How do we Show Different Ads Based on the User's Device?  Dynamical Ad
  Unit Inserting
slug: how-do-we-show-different-ads-based-on-the-users-device
tags:
  - news
category: How to
category_top_level:
  - Guides
  - Publishers
  - Advertisers
category_second_level:
  - How To
author: Danil Persky
thumbnail: /blog/assets/how-to-show-different-ads-based-on-user-s-device_.png
big_picture: /blog/assets/how-to-show-different-ads-based-on-user-s-device_short.png
popularity: "0"
meta_title: How do we Show Different Ads Based on the User's Device? Dynamical
  Ad Unit Inserting
meta_description: You can use this guide if you have two ad units of different
  sizes and want to show a particular banner based on your visitors' screen.
meta_keywords: ""
json_ld: ""
---
You can use this guide if you have two ad units of different sizes and want to show a particular banner based on your visitors' screen.

💡 Note that the range for desktop screens is 1920-429, and for mobile screens is 428-0. Let's say that we want to implement two ad units: one for desktop devices (size 728x90) and another for mobile devices (size 300x250).

1. Firstly, you need to create ad units. If you haven't done it yet, you may follow the steps in our  [\
   Helpdesk article](https://help.aads.com/en/article/how-to-start-earning-as-a-publisher-kongfq/).

❗ If you show only one of the ad units on mobile devices, you need to change the Screen type to "Mobile" in ad unit settings. To do so, go to the ad unit page ⇒ click "Edit," ⇒ change the Screen type.

2. After that, you need to insert into your HTML the "div" block with the class "banner-iframe-selector" that contains ad units:

```html
<div class="banner-iframe-selector">
    <div class="banner-iframe" data-src="https://ad.a-ads.com/2166128?size=300x250" data-max-width="467"></div>
    <div class="banner-iframe" data-src="https://ad.a-ads.com/1?size=728x90"></div>
</div>
```

3. Finally, you should insert the script that will show the ad based on the user's screen size:

```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const addIframe = (src, width, height, aa) => {
            const iframe = Object.assign(document.createElement('iframe'), {
                src, width, height, frameBorder: 0
            });
            iframe.setAttribute('data-aa', aa);
            return iframe;
        };

        const updateBanner = () => {
            const bannerDivs = document.querySelectorAll('.banner-iframe-selector .banner-iframe');
            bannerDivs.forEach(div => div.style.display = 'none');

            for (const div of bannerDivs) {
                const maxWidth = parseInt(div.getAttribute('data-max-width'));
                const src = div.getAttribute('data-src');
                const aaMatch = src?.match(/\/(\d+)\?/), sizeMatch = src?.match(/size=(\d+)x(\d+)/);

                if (aaMatch && sizeMatch && (window.innerWidth <= maxWidth || !maxWidth)) {
                    const [_, aa] = aaMatch, [__, width, height] = sizeMatch;
                    div.innerHTML = '';
                    div.appendChild(addIframe(src, width, height, aa));
                    div.style.display = 'block';
                    break;
                }
            }
        };

        updateBanner();
        window.addEventListener('resize', updateBanner);
    });

</script>
```

4. Done! Now, you can check it using different devices!!
