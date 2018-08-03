import React from 'react'
import PublishSubscribe from 'publish-subscribe-js'

import {
  SEARCH_COMPONENT_QUERY_CHANGE,
  SEARCH_PAGE_GET_SEARCH_QUERY
} from '../constants'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.onSearchInputChange = this.onSearchInputChange.bind(this)
    this.state = {
      searchQuery: ''
    }
  }

  componentDidMount() {
    PublishSubscribe.subscribe(SEARCH_PAGE_GET_SEARCH_QUERY, (searchQuery) => {
      this.setState({
        searchQuery
      })
    })
  }

  onSearchInputChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
    PublishSubscribe.publish(SEARCH_COMPONENT_QUERY_CHANGE, event);
  }

  render() {
    return (
      <div className='c-search' style={{display: 'block'}}>
        <form action='/search/' method='get'>
          <div className='c-search__query-wrapper'>
            <input  onChange={this.onSearchInputChange} 
              value={this.state.searchQuery} 
              type='text' 
              placeholder='Search' 
              name='search-query' 
            />
          </div>
          <div className='c-search__submit-btn-wrapper'>
            <button className='c-search__submit-btn' onClick='this.submit();'>
              <img src='/images/search-icon.svg' alt='search icon'/>
              <img src='/images/search-icon-active.svg' alt='search icon'/>
            </button>
          </div>
          <div className='c-search__close'></div>
        </form>
      </div>
    )
  }
}
