import React from 'react'
import { withPrefix } from 'gatsby'

export default () => (
  <div className='c-footer'> 
    <div className='c-footer__container l-container'> 
      <div className='c-footer__links'><a href='https://a-ads.com'>Learn more about A-ADS</a></div>
      <div className='c-footer__social-buttons'>
        <a href='https://www.facebook.com/aads.network/' target='_blank' rel='noopener noreferrer'><img src={withPrefix('/images/fb.svg')} alt=''/></a>
        <a href='https://twitter.com/aads_network' target='_blank' rel='noopener noreferrer'><img src={withPrefix('/images/twitter.svg')} alt=''/></a>
        {/* <a href='#'><img src='/images/medium.svg' alt=''/></a>
        <a href='#'><img src='/images/reddit.svg' alt=''/></a> */}
        <a href='https://bitcointalk.org/index.php?topic=140822' target='_blank' rel='noopener noreferrer'><img src={withPrefix('/images/btc.svg')} alt=''/></a>
      </div>
      <div className='c-footer__copyright'>© A-ADS 2011—{new Date().getFullYear()}</div>
    </div>
  </div>
)
