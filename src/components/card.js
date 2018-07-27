import React from 'react'

export default (props) => {
  const {
    title,
    thumbnail,
    link = '#'
  } = props

  return (
    <div className='c-card'>
      <a href={link}>
        <div className='c-card__image'>
          {thumbnail &&
            <img src={thumbnail} alt='card sample'/>
          }
        </div>
        <div className='c-card__text'>
          <div className='c-card__text__category'>Customer Support</div>
          <div className='c-card__text__title'>
            {title}
          </div>
        </div>
      </a>
    </div>
  )
}
