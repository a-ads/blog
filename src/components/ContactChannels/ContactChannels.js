import React from 'react'
import { withPrefix } from 'gatsby'

import * as css from './style.module.scss'

const ContactChannels = () => {
  return <div className={css.contactChannels}>
    <div className={css.titleWrap}>
      <h4>Ask us any questions in a channel you like</h4>
    </div>
    <div className={css.buttonsWrap}>
      <a target="_blank" rel="noopener nofollow" href="https://telegram.me/a_ads_support_bot" className='button --social'>
        <img src={withPrefix('/images/telegram-2.svg')} width={25} height={25} alt='telegram' />
        <span>Telegram</span>
      </a>
      <a target="_blank" rel="noopener nofollow" href="https://www.messenger.com/t/2153181881488233/" className='button --social'>
        <img src={withPrefix('/images/fb-messenger.svg')} width={25} height={25} alt='facebook' />
        <span>Facebook</span>
      </a>
      <a target="_blank" rel="noopener nofollow" href="mailto:support@aads.com" className='button --social'>
        <img src={withPrefix('/images/mail.svg')} width={25} height={25} alt='email' />
        <span>Email</span>
      </a>
    </div>
  </div>
}

export default ContactChannels
