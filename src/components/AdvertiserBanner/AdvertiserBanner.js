import React from 'react'

import * as css from './style.module.scss'

const AdvertiserBanner = () => {

  return <div className={css.banner}>
    <h4 className={css.title}>Get more paying customers</h4>
    <ul className='checklist'>
      <li>CPD, CPA and Revenue sharing models</li>
      <li>Global audience coverage</li>
      <li>Payments using various cryptocurrencies</li>
    </ul>
    <a className='button --ghost' href='#'>Become an advertiser</a>
    <div className={css.picture}>
      <img
        width={151}
        height={171}
        alt='advertiser pic'
        src='/images/advertiser-pic.svg'
      />
    </div>
  </div>
}

export default AdvertiserBanner
