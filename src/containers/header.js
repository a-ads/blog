import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { fallDown as MobileMenu } from 'react-burger-menu'
import { Link } from 'gatsby'
import _ from 'lodash'
import Search from '../components/search'
import { withPrefix } from 'gatsby'
import useDropdown from '../utils/use-dropdown'

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
    return (
      <div className='c-header'>
        <div className='c-header__container l-container c-header__container--desktop'>
          <div className='c-header__left-part'>
            <div className='c-header__logo'>
              <Link className='c-header__logo__container' to='/'>
                <img src={withPrefix('/images/logo.svg')} alt='logo' width='90' height='50' />
              </Link>
            </div>
            {this.renderUserTypeTagLinks()}
            <UserTypeTagsDropdown />
          </div>

          {this.createHeaderMenu()}
        </div>

        <div className='c-header__container l-container c-header__container--phone'>
          <div className='c-header__left-part'>
            <div className='c-header__logo'>
              <Link className='c-header__logo__container' to='/'>
                <img src={withPrefix('/images/logo.svg')} alt='logo' width='73' height='41' />
              </Link>
            </div>

            <UserTypeTagsDropdown />
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

              <div className="c-header__menu">
                <ul>
                  {this.renderCategoriesList()}
                </ul>
              </div>
            </div>
          </div>
        </MobileMenu>

      </div>
    )
  }

  createHeaderMenu() {
    return (
      <div className='c-header__menu'>
        <ul>
          {this.renderCategoriesList()}
          {!this.state.isSearchComponentDesktopActive &&
            <li className='--search-icon'>
              <a href='#' onClick={this.onSearchIconClick}>
                <img src={withPrefix('/images/search-icon.svg')} width='24' height='24' alt='search icon' />
              </a>
            </li>
          }
        </ul>
        {this.state.isSearchComponentDesktopActive &&
          <Search
            search={this.props.search}
            changeSearchQuery={this.props.changeSearchQuery}
            onOutsideClick={this.hideSearchComponentDesktop}
            focus={true}
          />
        }
      </div>
    )
  }

  renderCategoriesList() {
    const categories = this.props.categories
    return categories.map((category, key) => (
      <li key={key}>
        <Link to={`/categories/${_.kebabCase(category.node.title)}`}>
          {category.node.title}
        </Link>
      </li>
    ))
  }

  renderUserTypeTagLinks() {
    return (
      <div className='c-header__user-types'>
        <span>for:</span>
        <Link to="/tags/advertiser">Advertiser</Link>
        <Link to="/tags/publisher">Publisher</Link>
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

function UserTypeTagsDropdown() {
  const dropdownRef = useRef()
  const [isOpen, setIsOpen] = useDropdown({
    dropRef: dropdownRef
  })

  let selectedItem = 'All'

  if (typeof window !== 'undefined') {
    if (window.location.pathname.match(withPrefix('/tags/publisher'))) {
      selectedItem = 'Publisher'
    }
    if (window.location.pathname.match(withPrefix('/tags/advertiser'))) {
      selectedItem = 'Advertiser'
    }
  }

  return (
    <div className='c-header__user-types --dropdown' ref={dropdownRef}>
      <div
        className='c-header__user-types-drop-trigger'
        onClick={() => setIsOpen(true)}
      >
        for
        &nbsp;
        <span>{selectedItem}</span>
      </div>
      <div
        className={`
          c-header__user-types-drop-container
          ${isOpen ? '--visible' : ''}
        `}
      >
        <div className={`c-header__user-types-drop-container-inner`}>
          {selectedItem !== 'All' &&
            <Link to="/">All</Link>
          }
          {selectedItem !== 'Advertiser' &&
            <Link to="/tags/advertiser/">Advertiser</Link>
          }
          {selectedItem !== 'Publisher' &&
            <Link to="/tags/publisher/">Publisher</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
