import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css/bundle"

import getCategoryPath from '/src/utils/get-category-path'
import * as css from './style.module.scss'

const CategoriesSecondLevel = ({
  categories,
  currentCategory
}) => {
  return <div className={css.categories}>
    <div className={cn(css.desktopWrap, 'phone-hidden')}>
      <Link to='/categories/guides'>
        <p className={cn(css.item, currentCategory === 'All' && css.active)}>
          All
        </p>
      </Link>
      {categories.map(({ node }) => {
        return <Link to={getCategoryPath(node.title)} key={`categories-list-${getCategoryPath(node.title)}`}>
          <p className={cn(css.item, currentCategory === node.title && css.active)}>
            {node.title}
          </p>
        </Link>
      })}
    </div>
    <div className={cn(css.sliderWrap, 'phone-visible --flex')}>
      <Swiper
        className={css.slider}
        spaceBetween={8}
        grabCursor={true}
        slidesPerView={'auto'}
        freeMode={true}
      >
        <SwiperSlide
          className={css.sliderItem}
        >
          <Link to='/categories/guides'>
            <p className={cn(css.item, currentCategory === 'All' && css.active)}>
              All
            </p>
          </Link>
        </SwiperSlide>
        {categories.map(({ node }) => {
          return <SwiperSlide
            className={css.sliderItem}
            key={`categories-list-${getCategoryPath(node.title)}`}
          >
            <Link to={getCategoryPath(node.title)}>
              <p className={cn(css.item, currentCategory === node.title && css.active)}>
                {node.title}
              </p>
            </Link>
          </SwiperSlide>
        })}
      </Swiper>
    </div>
  </div>
}

export default CategoriesSecondLevel
