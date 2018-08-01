import React from 'react'

import Subscribe from './subscribe'
import Search from './search'

export default ({
  categories
}) => (
  <div className='c-header'>
    <div className='c-header__container l-container c-header__container--desktop'>
      <div className='c-header__logo'>
        <a className='c-header__logo__container' href='/'>
          <div className='c-header__logo__part-1'><img src='/images/glyph.svg' alt='logo'/></div>
          <div className='c-header__logo__part-2'><img src='/images/logo.svg' alt='logo'/></div>
        </a>
      </div>
      <Subscribe />
      <Search />
      <div className='c-header__menu' style={{display: 'none'}}>
        <ul>
          {categories.map(category => {
            return <li><a href="#">{category.node.frontmatter.title}</a></li>
          })}
          <li className='--search-icon'><a href='#'><img src='/images/search-icon.svg' alt='search icon'/></a></li>
        </ul>
      </div>
    </div>
    <div className='c-header__container l-container c-header__container--mobile'>
      <div className='c-header__logo'>
        <a className='c-header__logo__container' href='/'>
          <div className='c-header__logo__part-1'><img src='/images/glyph.svg' alt='logo'/></div>
        </a>
      </div>
      <div className='c-header__burger'></div>
    </div>
    <div className='c-header__dropdown-menu'>
      <div className='c-header__dropdown-menu-container'>
        <Search />
        <div className='c-header__menu'>
          <ul>
            {categories.map(category => {
              return <li><a href="#">{category.node.frontmatter.title}</a></li>
            })}
          </ul>
        </div>
        <Subscribe mobile />
      </div>
    </div>
  </div>
)
