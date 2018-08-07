import React from 'react'
import PublishSubscribe from 'publish-subscribe-js'

import {
  SEARCH_COMPONENT_QUERY_CHANGE,
  SEARCH_PAGE_GET_SEARCH_QUERY
} from '../constants'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.searchQueryInputRef = React.createRef()
    this.searchFormSubmitId = 'search-form-submit' //TODO сделать уникальным
    this.onSearchQueryInputChange = this.onSearchQueryInputChange.bind(this)
    this.onCrossClick = this.onCrossClick.bind(this)
  }

  render() {
    return (
      <div className='c-search' style={{}}>
        <form action='/search/' method='get'>
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
  }

  onSearchQueryInputChange(event) {
    this.props.changeSearchQuery(event.target.value)
  }

  isSearchQueryEmpty() {
    return !this.props.search.query
  }

  focusOnSearchQueryInput() {
    this.searchQueryInputRef.current.focus()
  }

  onCrossClick() {
    this.clearSearchQuery()
    this.focusOnSearchQueryInput()
  }

  clearSearchQuery() {
    this.props.changeSearchQuery('')
  }
}
