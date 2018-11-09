import React from 'react'
import { Link } from "gatsby"

export default (props) => {
  const {
    title = '',
    thumbnail = '',
    link = '#',
    category = '',
    excerpt = '',
    additionalClassName = '',
  } = props

  return (
    <div className={`c-card ${additionalClassName}`}>
      {/* <a href={link}> */}
      <Link to={link}>
        <div className='c-card__image'>
          {thumbnail &&
            <img src={thumbnail} alt='card sample'/>
          }
        </div>
        <div className='c-card__text'>
          <div className='c-card__text__title'>
            {title}
          </div>
          <div className='c-card__text__excerpt'>
            {excerpt}
          </div>
          <div className='c-card__text__category'>{category}</div>
        </div>
      </Link>
      {/* </a> */}
    </div>
  )
}
