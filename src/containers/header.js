import React from 'react'
import { connect } from 'react-redux'

import Subscribe from '../components/subscribe'
import Search from '../components/search'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearchComponentDesktopActive: false
    }
    this.onSearchIconClick = this.onSearchIconClick.bind(this)
    this.hideSearchComponentDesktop = this.hideSearchComponentDesktop.bind(this)
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
              ref={this.searchComponentDesktopRef}
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
          <div className='c-header__burger'></div>
        </div>
        <div className='c-header__dropdown-menu'>
          <div className='c-header__dropdown-menu-container'>
            {/* <Search /> */}
            <div className='c-header__menu'>
              <ul>
                {categories.map((category, key) => {
                  return (
                    <li key={key}>
                      <a href="#">{category.node.frontmatter.title}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <Subscribe mobile />
          </div>
        </div>
      </div>
    )
  }

  createHeaderMenu() {
    const categories = this.props.categories
    return (
      <div className='c-header__menu' style={{}}>
        <ul>
          {categories.map((category, key) => {
            return <li key={key}><a href="#">{category.node.frontmatter.title}</a></li>
          })}
          <li className='--search-icon'>
            <a href='#' onClick={this.onSearchIconClick}>
              <img src='/images/search-icon.svg' alt='search icon'/>
            </a>
          </li>
        </ul>
      </div>
    )
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
