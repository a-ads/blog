import React from 'react'

export default () => (
  <div className='c-footer'> 
    <div className='c-footer__container l-container'> 
      <div className='c-footer__copyright'>© A-ADS 2011—{new Date().getFullYear()}</div>
      <div className='c-footer__social-buttons'>
        <a href='#'><img src='/images/fb.svg' alt=''/></a>
        <a href='#'><img src='/images/twitter.svg' alt=''/></a>
        <a href='#'><img src='/images/medium.svg' alt=''/></a>
        <a href='#'><img src='/images/reddit.svg' alt=''/></a>
        <a href='#'><img src='/images/btc.svg' alt=''/></a>
      </div>
      <div className='c-footer__links'><a href='#'>About A-ADS</a><a href='#'>Contacts</a></div>
    </div>
  </div>
)
