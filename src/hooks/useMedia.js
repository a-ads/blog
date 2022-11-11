import React, { createElement } from "react";
import _ from "lodash";

import Icon from "../components/Icon";
import cn from "../utils/cn";

import {
  Telegram,
  TgNoBg,
  Fbmessenger,
  Whatsapp,
  Twitter,
  Fb,
  Btc,
  Envelope,
  Linkedin,
  Instagram,
  Reddit,
} from "../components/icons";

export const medias = {
  // Ask us any questions
  tg: {
    to: "https://telegram.me/a_ads_support_bot",
    i: <TgNoBg />,
    text: "Telegram",
  },
  fbmessenger: {
    to: "https://www.messenger.com/t/2153181881488233/",
    i: <Fbmessenger />,
    text: "Facebook Messenger",
  },
  support: {
    to: "mailto:support@a-ads.com",
    i: <Envelope />,
    text: "support@a-ads.com",
  },
  whatsapp: {
    to: "https://web.dev/i18n/ru/link-name/",
    i: <Whatsapp />,
    text: "WhatsApp",
  },

  // Footer
  twitter: {
    to: "https://twitter.com/aads_network",
    i: <Twitter />,
  },
  fb: {
    to: "https://www.facebook.com/aads.network/",
    i: <Fb />,
  },
  btc: {
    to: "https://bitcointalk.org/index.php?topic=140822",
    i: <Btc />,
  },
  telegram: {
    to: "https://telegram.me/a_ads_support_bot",
    i: <Telegram />,
  },
  linkedin: {
    to: "https://www.linkedin.com/company/81936734/admin/",
    i: <Linkedin />,
  },
  instagram: {
    to: "https://www.instagram.com/accounts/login/?next=/aads.network/",
    i: <Instagram />,
  },
  reddit: {
    to: "https://www.reddit.com/r/aadsnetwork",
    i: <Reddit />,
  },
};

const frontmatterMap = {
  bitcointalk_link: "btc",
  facebook_link: "fb",
  twitter_link: "twitter",
};

export default ({ ids, className, text, size = 28, ...props }) => {
  const reactElements = [];

  const createMedia = (mediaProps) => {
    reactElements.push(
      createElement("a", {
        className: cn(`btn media ${text ? "text gap-0n5" : ""}`, className),
        href: mediaProps.to,
        target: "_blank",
        rel: "noreferrer",
        children: [
          createElement(Icon, {
            i: mediaProps.i,
            size,
            className: "i-before txt-200-primary",
          }),
          text && (typeof text === "string" ? text : mediaProps.text),
        ],
        key: mediaProps.to,
        ...props,
      })
    );
  };

  if (ids instanceof Array) {
    _.forIn(medias, (v, k) => {
      if (ids.includes(k)) createMedia(v);
    });
  } else {
    Object.keys(frontmatterMap).forEach((frontmatterKey) => {
      if (ids?.[frontmatterKey]) {
        const to = ids[frontmatterKey];
        const mediasKey = frontmatterMap[frontmatterKey];
        createMedia({ ...medias[mediasKey], to });
      }
    });
  }

  return reactElements;
};
