import React from 'react'
import cn from 'classnames'
import { get } from 'lodash-es'

import { Link, Icon } from '@ui'
import {
  TgNoBg,
  FbMessenger,
  Envelope,
  Whatsapp,
  Twitter,
  Fb,
  Btc,
  Telegram,
  Linkedin,
  Instagram,
  Reddit,
} from '@icons'

export const socials = {
  iconsWithText: {
    tg: {
      to: 'https://telegram.me/a_ads_support_bot',
      icon: <TgNoBg />,
      text: 'Telegram',
    },
    fbmessenger: {
      to: 'https://www.messenger.com/t/2153181881488233/',
      icon: <FbMessenger />,
      text: 'Facebook Messenger',
    },
    support: {
      to: 'mailto:support@a-ads.com',
      icon: <Envelope />,
      text: 'support@a-ads.com',
    },
    whatsapp: {
      to: 'https://web.dev/i18n/ru/link-name/',
      icon: <Whatsapp />,
      text: 'WhatsApp',
    },
  },
  iconsWithoutText: {
    twitter: {
      to: 'https://twitter.com/aads_network',
      icon: <Twitter />,
    },
    fb: {
      to: 'https://www.facebook.com/aads.network/',
      icon: <Fb />,
    },
    btc: {
      to: 'https://bitcointalk.org/index.php?topic=140822',
      icon: <Btc />,
    },
    telegram: {
      to: 'https://telegram.me/a_ads_support_bot',
      icon: <Telegram />,
    },
    linkedin: {
      to: 'https://www.linkedin.com/company/81936734/admin/',
      icon: <Linkedin />,
    },
    instagram: {
      to: 'https://www.instagram.com/accounts/login/?next=/aads.network/',
      icon: <Instagram />,
    },
    reddit: {
      to: 'https://www.reddit.com/r/aadsnetwork',
      icon: <Reddit />,
    },
  },
}

const getSocial = (socialId: SocialId, withText?: boolean) => {
  const key = withText ? 'iconsWithText' : 'iconsWithoutText'

  return {
    to: get(socials, [key, socialId, 'to']),
    icon: get(socials, [key, socialId, 'icon']),
    text: get(socials, [key, socialId, 'text']),
    iconClassName: withText
      ? 'h-7 w-7 body-3 gap-2 font-primary'
      : 'h-9 w-9 bg-gray-5 hover:bg-blue rounded-full',
  }
}

export type SocialId =
  | keyof typeof socials.iconsWithText
  | keyof typeof socials.iconsWithoutText
export type SocialButtonProps = {
  socialId: SocialId
  withText?: boolean
  customText?: string
  className?: string
  title?: string
  [key: string]: unknown
}

const SocialButton: React.FC<SocialButtonProps> = ({
  socialId,
  withText,
  customText,
  className,
  title,
  ...props
}) => {
  const {
    to,
    icon,
    text = customText,
    iconClassName,
  } = getSocial(socialId, withText)

  return (
    <Link
      external
      ghost
      to={to}
      target='_blank'
      title={title}
      className={cn(className, {
        'body-3 gap-2 font-primary': withText,
      })}
      aria-label='Social media button'
      {...props}
    >
      {icon && <Icon i={icon} className={iconClassName} />}
      {text}
    </Link>
  )
}

export default SocialButton
