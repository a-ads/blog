import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import * as R from 'ramda'
import cn from 'classnames'

import * as css from './style.module.scss'

const propTypes = {
  postNode: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      readingTime: PropTypes.shape({
        text: PropTypes.string.isRequired
      })
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      category_top_level: PropTypes.array.isRequired,
      thumbnail: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fixed: PropTypes.object.isRequired
        })
      }),
    }),
  }),
  className: PropTypes.string,
  large: PropTypes.bool
}

const ArticleCard = props => {
  const {
    postNode,
    large = false,
    className
  } = props

  const slug = postNode.fields.slug
  const picSrc = postNode.frontmatter.thumbnail?.childImageSharp.fixed
  const title = postNode.frontmatter.title
  const category = R.take(1, postNode.frontmatter.category_top_level)[0]
  const readingTime = postNode.fields.readingTime.text
  const excerpt = postNode.excerpt

  return <Link
    className={cn(css.articleCard, large && css.large, className)}
    to={slug}
  >
    <div className={css.picture}>
      <Img
        fixed={picSrc}
        objectFit="cover"
        objectPosition="50% 50%"
        alt={title}
      />
    </div>
    <div className={css.text}>
      <p className={css.category}>{category}</p>
      <h3 className={css.title}>{title}</h3>
      <p className={css.excerpt}>{excerpt}</p>
      <p className={css.readingTime}>{readingTime}</p>
    </div>
  </Link>
}

ArticleCard.propTypes = propTypes

export default ArticleCard
