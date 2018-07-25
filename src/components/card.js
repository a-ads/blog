import React from 'react'

export default () => (
  <div className='c-card'>
    <a href='#'>
      <div className='c-card__image'><img src='/images/card-sample.png' alt='card sample'/></div>
        <div className='c-card__text'>
          <div className='c-card__text__category'>Customer Support</div>
          <div className='c-card__text__title'>
            Stripe’s Will Larson 
            on engineering and infrastructure management
          </div>
      </div>
    </a>
  </div>
)
