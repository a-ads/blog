import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share'
import { Fb, Linkedin, Twitter } from '@icons'

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
