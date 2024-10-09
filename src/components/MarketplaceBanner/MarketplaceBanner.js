import React from 'react'
import cn from 'classnames'

import * as css from './style.module.scss'

const MarketplaceBanner = () => {
  return <div className={css.banner}>
    <h4 className={css.title}>Advertise your project on Marketplace</h4>
    <p className={css.description}>Distribute press releases, articles, social media posts,<br />and ad videos safe and easy</p>
    <a href="/marketplace/" className={cn(css.button, 'button --white --large')}>Explore Marketplace</a>
  </div>
}

export default MarketplaceBanner
