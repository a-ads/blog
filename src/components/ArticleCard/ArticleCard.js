import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import cn from 'classnames'
import * as css from './style.module.scss'

const propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picSrc: PropTypes.string,
  category: PropTypes.string.isRequired,
  large: PropTypes.bool,
}

const ArticleCard = props => {
  const {
    slug,
    title,
    picSrc,
    category,
    large = false,
  } = props

  return <Link 
    className={cn(css.articleCard, large && css.large)}
    to={slug}
  >
    <div className={css.picture} style={{backgroundImage: 'url(/images/sample-card-picture.png)'}} />
    <div className={css.text}>
      <p className={css.category}>{category}</p>
      <h3 className={css.title}>{title}</h3>
      <p className={css.readingTime}>4 min read</p>
    </div>
  </Link>
}

export default ArticleCard
