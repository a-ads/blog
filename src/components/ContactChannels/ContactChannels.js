import React from 'react'

import * as css from './style.module.scss'

const ContactChannels = () => {
  return <div className={css.contactChannels}>
    <div className={css.titleWrap}>
      <h4>Ask us any questions in a channel you like</h4>
    </div>
    <div className={css.buttonsWrap}>
      <a className='button --social'><img src='/images/telegram-2.svg' width={25} height={25} alt='telegram' /><span>Telegram</span></a>
      <a className='button --social'><img src='/images/fb-messenger.svg' width={25} height={25} alt='facebook' /><span>Facebook</span></a>
      <a className='button --social'><img src='/images/mail.svg' width={25} height={25} alt='email' /><span>Email</span></a>
    </div>
  </div>
}

export default ContactChannels
