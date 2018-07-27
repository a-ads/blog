import React from 'react'

import Subscribe from './subscribe'

export default () => (
  <div className='c-header'>
    <div className='c-header__container l-container c-header__container--desktop'>
      <div className='c-header__logo'>
        <a className='c-header__logo__container' href='/'>
          <div className='c-header__logo__part-1'><img src='/images/glyph.svg' alt='logo'/></div>
          <div className='c-header__logo__part-2'><img src='/images/logo.svg' alt='logo'/></div>
        </a>
      </div>

      <Subscribe />

      <div className='c-search'>
        <form>
          <div className='c-search__query-wrapper'>
            <input type='text' placeholder='Search' name='query'/>
          </div>
          <div className='c-search__submit-btn-wrapper'>
            <button className='c-search__submit-btn' onClick='this.submit();'><img src='/images/search-icon.svg' alt='search icon'/><img src='images/search-icon-active.svg' alt='search icon'/></button>
          </div>
          <div className='c-search__close'></div>
        </form>
      </div>
      <div className='c-header__menu'>
        <ul>
          <li><a href='#'>Customer Support</a></li>
          <li><a href='#'>Sales & Marketing</a></li>
          <li><a href='#'>Product Managment</a></li>
          <li><a href='#'>Agile management</a></li>
          <li><a href='#'>Updates</a></li>
          <li className='--search-icon'><a href='#'><img src='/images/search-icon.svg' alt='search icon'/></a></li>
        </ul>
      </div>
    </div>
    <div className='c-header__container l-container c-header__container--mobile'>
      <div className='c-header__logo'><a className='c-header__logo__container' href='#'>
          <div className='c-header__logo__part-1'><img src='/images/glyph.svg' alt='logo'/></div></a></div>
      <div className='c-header__burger'></div>
    </div>
    <div className='c-header__dropdown-menu'>
      <div className='c-header__dropdown-menu-container'>
        <div className='c-search'>
          <form>
            <div className='c-search__query-wrapper'>
              <input type='text' placeholder='Search' name='query'/>
            </div>
            <div className='c-search__submit-btn-wrapper'>
              <button className='c-search__submit-btn' onClick='this.submit();'><img src='/images/search-icon.svg' alt='search icon'/><img src='images/search-icon-active.svg' alt='search icon'/></button>
            </div>
            <div className='c-search__close'></div>
          </form>
        </div>
        <div className='c-header__menu'>
          <ul>
            <li><a href='#'>Customer Support</a></li>
            <li><a href='#'>Sales & Marketing</a></li>
            <li><a href='#'>Product Managment</a></li>
            <li><a href='#'>Agile management</a></li>
            <li><a href='#'>Updates</a></li>
          </ul>
        </div>
        <div className='c-subscribe c-subscribe--mobile'> 
          <div className='c-subscribe__wrapper'>
            <div className='c-subscribe__title h2-like'>Subscribe to our newsletter</div>
            <div className='c-subscribe__container'>
              <form>
                <div className='c-subscribe__input-wrapper'>
                  <input type='text' placeholder='Enter your email'/>
                </div>
                <div className='c-subscribe__submit-wrapper'>
                  <input type='submit' value=''/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
