import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import cn from 'classnames'

import { Link } from '@ui'

export interface CardProps extends BlogPostCard {
  className?: string
}

const absoluteSlug = (slug: string) => {
  if (slug.startsWith('/')) {
    return slug.toLowerCase().trim()
  }
  return `/${slug.toLowerCase().trim()}`
}

const Card: React.FC<CardProps> = ({
  title,
  thumbnail,
  slug,
  category_top_level,
  reading_time,
  className,
  ...props
}) => {
  return (
      <Link
          className={cn(
              'flex flex-col p-0 hover:text-[#717171] duration-100',
              className
          )}
          to={absoluteSlug(slug)}
          {...props}
      >
        <GatsbyImage image={getImage(thumbnail)!} alt={title} />
        <div className='mt-4'>
          {category_top_level && (
              <span className='clr-blue uppercase !font-semibold font-secondary body-3 mr-4'>
          {Array.isArray(category_top_level)
              ? category_top_level[0]
              : category_top_level}
        </span>
          )}
          {reading_time && (
              <span className='clr-secondary'>{reading_time} read time</span>
          )}
        </div>
        <span className='h3'>{title}</span>
      </Link>
  )
}

export default Card
