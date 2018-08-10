import React from 'react'
import { connect } from 'react-redux'
import { fallDown as MobileMenu } from 'react-burger-menu'

import Subscribe from '../components/subscribe'
import Search from '../components/search'


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearchComponentDesktopActive: false,
      isMobileMenuOpen: false
    }
    this.onSearchIconClick = this.onSearchIconClick.bind(this)
    this.hideSearchComponentDesktop = this.hideSearchComponentDesktop.bind(this)
    this.onBurgerClick = this.onBurgerClick.bind(this)
  }

  render() {
    const categories = this.props.categories

    return (
      <div className='c-header'>
        <div className='c-header__container l-container c-header__container--desktop'>
          <div className='c-header__logo'>
            <a className='c-header__logo__container' href='/'>
              <div className='c-header__logo__part-1'><img src='/images/glyph.svg' alt='logo'/></div>
              <div className='c-header__logo__part-2'><img src='/images/logo.svg' alt='logo'/></div>
            </a>
          </div>
          <Subscribe />
          {this.state.isSearchComponentDesktopActive ?
            <Search 
              search={this.props.search}
              changeSearchQuery={this.props.changeSearchQuery}
              onOutsideClick={this.hideSearchComponentDesktop}
            />
            :
            this.createHeaderMenu()
          }
        </div>

        <div className='c-header__container l-container c-header__container--mobile'>
          <div className='c-header__logo'>
            <a className='c-header__logo__container' href='/'>
              <div className='c-header__logo__part-1'><img src='/images/glyph.svg' alt='logo'/></div>
            </a>
          </div>
          <div className='c-header__burger' onClick={this.onBurgerClick}></div>
        </div>

        <MobileMenu 
          isOpen={this.state.isMobileMenuOpen}
          width='100%'
          height='auto'
          onStateChange={(state) => this.handleMobileMenuStateChange(state)}
        >
          <div className='c-header__dropdown-menu'>
            <div className='c-header__dropdown-menu-container'>
              <Search 
                search={this.props.search}
                changeSearchQuery={this.props.changeSearchQuery}
              />
              <div className='c-header__menu'>
                <ul>
                  {this.createCategoriesList()}
                </ul>
              </div>
              <Subscribe mobile />
            </div>
          </div>
        </MobileMenu>

      </div>
    )
  }

  createHeaderMenu() {
    return (
      <div className='c-header__menu' style={{}}>
        <ul>
          {this.createCategoriesList()}
          <li className='--search-icon'>
            <a href='#' onClick={this.onSearchIconClick}>
              <img src='/images/search-icon.svg' alt='search icon'/>
            </a>
          </li>
        </ul>
      </div>
    )
  }

  createCategoriesList() {
    const categories = this.props.categories
    return categories.map((category, key) => (
      <li key={key}>
        <a href={`/search/?search-query=${encodeURIComponent(category.node.title)}`}>
          {category.node.title}
        </a>
      </li>
    ))
  }

  onSearchIconClick() {
    this.showSearchComponentDesktop()
  }

  showSearchComponentDesktop() {
    this.setState({
      isSearchComponentDesktopActive: true
    })
  }

  hideSearchComponentDesktop() {
    this.setState({
      isSearchComponentDesktopActive: false
    })
  }

  handleMobileMenuStateChange(state) {
    this.setState({
      isMobileMenuOpen: state.isOpen
    })
  }

  onBurgerClick() {
    this.toggleMobileMenu()
  }

  toggleMobileMenu() {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    })
  }
}

const mapStateToProps = (state) => {
  return { 
    search: state.search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSearchQuery: (searchQuery) => dispatch({ //TODO сделать отдельный файл в actions
      type: 'SEARCH_QUERY_CHANGE',
      payload: searchQuery
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
