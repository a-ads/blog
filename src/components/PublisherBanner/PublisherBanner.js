import React from 'react'

import * as css from './style.module.scss'

const PublisherBanner = () => {
  return <div className={css.banner}>
    <h4 className={css.title}>Earn crypto on your website</h4>
    <ul className='checklist'>
      <li>Simple HTML code embeddable in any website</li>
      <li>We don't collect your users' personal data</li>
      <li>Transparent payouts and live statistics</li>
    </ul>
    <a className='button --ghost' href='#'>Become a publisher</a>
    <div className={css.picture}>
      <img
        width={151}
        height={173}
        alt='publisher pic'
        src='/images/publisher-pic.svg'
      />
    </div>
  </div>
}

export default PublisherBanner
