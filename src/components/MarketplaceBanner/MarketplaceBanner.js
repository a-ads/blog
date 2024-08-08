import React from 'react'
import cn from 'classnames'

import * as css from './style.module.scss'

const MarketplaceBanner = () => {
  return <div className={css.banner}>
    <h3 className={css.title}>Advertise your project on Marketplace</h3>
    <p className={css.description}>Distribute press releases, articles, social media posts,<br />and ad videos safe and easily</p>
    <a href="#" className={cn(css.button, 'button --white --large')}>Explore Marketplace</a>
  </div>
}

export default MarketplaceBanner
