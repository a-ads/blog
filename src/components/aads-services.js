import React from 'react'

export default () => (
  <div className='c-aads-services'>
    <div className='c-aads-services__container l-container'>
      <div className='c-aads-services__item'>
        <div className='c-aads-services__item-pic'><img src='images/megaphone.svg' alt='megaphone'/></div>
        <div className='c-aads-services__item-title h2-like'>For advertisers</div>
        <p className='c-aads-services__item-descr'>
          You don't need to pay for fake clicks 
          and impressions. Create your advertising 
          campaign in less than a minute. 
          No registration required!
        </p><a className='c-aads-services__item-btn' href='#'>Create campaign</a>
      </div>
      <div className='c-aads-services__item'>
        <div className='c-aads-services__item-pic'><img src='/images/coin.svg' alt='coin'/></div>
        <div className='c-aads-services__item-title h2-like'>For publishers</div>
        <p className='c-aads-services__item-descr'>
          Our ads are safe and lightweight, no scripts 
          or cookies, just plain HTML+CSS! 
          We offer automatic withdrawals to your Bitcoin 
          address. Any website will do.
        </p><a className='c-aads-services__item-btn' href='#'>Create ad unit</a>
      </div>
    </div>
  </div>
)
