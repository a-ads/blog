import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from 'react-share'
import { Btc, Envelope, Fb, Linkedin, Twitter } from '@icons'

export const socials = {
  twitter: {
    to: 'https://twitter.com/aads_network',
    icon: <Twitter />,
  },
  fb: {
    to: 'https://www.facebook.com/aads.network/',
    icon: <Fb />,
  },
  linkedin: {
    to: 'https://www.linkedin.com/company/81936734/admin/',
    icon: <Linkedin />,
  },
}

interface ShareButtonsProps {
  url: string
  text: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, text }) => {
  return (
    <>
      <TwitterShareButton url={url} title={text}>
        <Twitter className={'h-9 w-9 bg-gray-5 hover:bg-blue rounded-full'} />
      </TwitterShareButton>
      <FacebookShareButton url={url} title={text}>
        <Fb className={'h-9 w-9 bg-gray-5 hover:bg-blue rounded-full'} />
      </FacebookShareButton>
      <LinkedinShareButton url={url} title={text}>
        <Linkedin className={'h-9 w-9 bg-gray-5 hover:bg-blue rounded-full'} />
      </LinkedinShareButton>
    </>
  )
}

export default ShareButtons
