import React, { useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import Dotdotdot from 'dotdotdot-js/dist/dotdotdot.es6.js'

export default (props) => {
  const {
    title = '',
    thumbnail = '',
    link = '#',
    category = '',
    excerpt = '',
    additionalClassName = '',
  } = props

  const titleRef = useRef(null)
  useEffect(() => {
    new Dotdotdot(titleRef.current, {
      tolerance: 1
    })
  })

  return (
    <div className={`c-card ${additionalClassName}`}>
      <Link to={link}>
        <div className='c-card__image'>
          {thumbnail &&
            <img src={thumbnail} alt='card sample'/>
          }
        </div>
        <div className='c-card__text'>
          <div ref={titleRef} className='c-card__text__title'>
            {title}
          </div>
          <div className='c-card__text__excerpt'>
            {excerpt}
          </div>
          <div className='c-card__text__category'>{category}</div>
        </div>
      </Link>
    </div>
  )
}
