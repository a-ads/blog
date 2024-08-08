import React from 'react'
import cn from 'classnames'

import * as css from './style.module.scss'

const TrafficMonetizationBanner = () => {
  return <div className={css.banner}>
    <h3 className={css.title}>All-in-one traffic monetization solution</h3>
    <p className={css.description}>Game-changing ad technologies for unlimited<br />earnings from website traffic</p>
    <a href="#" className={cn(css.button, 'button --white --large')}>Explore the benefits</a>
  </div>
}

export default TrafficMonetizationBanner
