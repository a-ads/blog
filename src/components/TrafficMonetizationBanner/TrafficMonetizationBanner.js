import React from 'react'
import cn from 'classnames'

import * as css from './style.module.scss'

const TrafficMonetizationBanner = () => {
  return <div className={css.banner}>
    <div className={'container'}>
      <h4 className={css.title}>All-in-one traffic <br className="phone-visible" />monetization solution</h4>
      <p className={css.description}>Game-changing ad technologies <br className='phone-visible' />for unlimited <br className='phone-hidden' />earnings from <br className='phone-visible' />website traffic</p>
      <a href="/earn/" className={cn(css.button, 'button --white --large')}>Explore the benefits</a>
    </div>
  </div>
}

export default TrafficMonetizationBanner
