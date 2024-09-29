import React from 'react'
import { withPrefix } from 'gatsby'
import cn from 'classnames'

import * as css from './style.module.scss'

const AdvertiserBanner = () => {

  return <div className={css.banner}>
    <h5 className={css.title}>Get more paying customers</h5>
    <ul className='checklist'>
      <li>CPD, CPA and Revenue sharing models</li>
      <li>Global audience coverage</li>
      <li>Payments using various cryptocurrencies</li>
    </ul>
    <a className={cn(css.button, 'button --ghost')} href='/campaigns/new/'>Become an advertiser</a>
    <div className={css.picture}>
      <img
        width={151}
        height={171}
        alt='advertiser pic'
        src={withPrefix('/images/advertiser-pic.svg')}
      />
    </div>
  </div>
}

export default AdvertiserBanner
