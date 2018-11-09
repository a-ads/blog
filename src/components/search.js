import React from 'react'
import { withPrefix } from "gatsby"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.searchQueryInputRef = React.createRef()
    this.searchFormSubmitId = 'search-form-submit'
    this.onSearchQueryInputChange = this.onSearchQueryInputChange.bind(this)
    this.onCrossClick = this.onCrossClick.bind(this)
    this.setSearchComponentRef = this.setSearchComponentRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  render() {
    return (
      <div className='c-search' ref={this.setSearchComponentRef}>
        <form action='/blog/search/' method='get'>
          <div className='c-search__query-wrapper'>
            <input type='text' 
              name='search-query' 
              value={this.props.search.query} 
              placeholder='Search' 
              ref={this.searchQueryInputRef}
              onChange={this.onSearchQueryInputChange} 
            />
          </div>
          <div className='c-search__submit-btn-wrapper'>
            <label htmlFor={this.searchFormSubmitId} className='c-search__submit-btn'>
              <img src='/images/search-icon.svg' alt='search icon'/>
              <img src='/images/search-icon-active.svg' alt='search icon'/>
            </label>
            <input type='submit' 
              id={this.searchFormSubmitId}
              style={{display: 'none'}} 
            />
          </div>
          {!this.isSearchQueryEmpty() &&
            <div className='c-search__cross' 
              onClick={this.onCrossClick}
            />
          }
        </form>
      </div>
    )
  }

  componentDidMount() {
    this.focusOnSearchQueryInput()
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  focusOnSearchQueryInput() {
    this.searchQueryInputRef.current.focus()
  }

  setSearchComponentRef(node) {
    this.searchComponentRef = node
  }

  handleClickOutside(event) {
    if (this.isClickOutside(event) && this.props.onOutsideClick) {
      this.props.onOutsideClick()
    }
  }

  isClickOutside(event) {
    return this.searchComponentRef && !this.searchComponentRef.contains(event.target)
  }

  onSearchQueryInputChange(event) {
    this.props.changeSearchQuery(event.target.value)
  }

  isSearchQueryEmpty() {
    return !this.props.search.query
  }

  onCrossClick() {
    this.clearSearchQuery()
    this.focusOnSearchQueryInput()
  }

  clearSearchQuery() {
    this.props.changeSearchQuery('')
  }
}
