import React, { useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import TruncateHtmlText from '../utils/truncate-html-text'
import Img from './Img'
import _ from 'lodash'
import cn from '../utils/cn'

export default ({
  title,
  thumbnail,
  link,
  category_top_level,
  readingTime,
  className = '',
  ...props
}) => {
  const titleRef = useRef(null)
  useEffect(() => {
    const truncateTitle = new TruncateHtmlText(titleRef.current)

    return function cleanup() {
      truncateTitle.destroy()
    }
  })

  const imgCn = className ? (className.includes('col')
    ? 'max-hght-400 s-max-hght-150'
    : 'max-hght-200 s-hght-150')
    : 'max-hght-200 s-hght-150'
  
  let categoryTopLevelFirst = ''
  if (_.isArray(category_top_level)) {
    categoryTopLevelFirst = category_top_level[0]
  }

  return (
    <Link className={cn('flex column txt-primary-400', className)} to={link} {...props}>
      <span className={imgCn}>
        <Img src={thumbnail} className='fullsize' style={{ objectFit: 'cover' }} />
      </span>
      <div className='body-1 mt-1'>
        {categoryTopLevelFirst && <span className='txt-primary-200 uppercase bold body-1 f-family-secondary mr-1'>{categoryTopLevelFirst}</span>}
        <span className='txt-grey-200'>{readingTime}</span>
      </div>
      <h3 ref={titleRef} style={{ marginTop: -2 }}>{title}</h3>
    </Link>
  )
}
