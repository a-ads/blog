import React from 'react'

import PublishSubscribe from 'publish-subscribe-js'
import {
  SEARCH_COMPONENT_QUERY_CHANGE
} from '../constants'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.onSearchInputChange = this.onSearchInputChange.bind(this)
  }

  componentDidMount() {
    
  }

  onSearchInputChange(event) {
    PublishSubscribe.publish(SEARCH_COMPONENT_QUERY_CHANGE, event);
  }

  render() {
    return (
      <div className='c-search' style={{display: 'block'}}>
        <form>
          <div className='c-search__query-wrapper'>
            <input onChange={this.onSearchInputChange} type='text' placeholder='Search' name='query'/>
          </div>
          <div className='c-search__submit-btn-wrapper'>
            <button className='c-search__submit-btn' onClick='this.submit();'>
              <img src='/images/search-icon.svg' alt='search icon'/>
              <img src='images/search-icon-active.svg' alt='search icon'/>
            </button>
          </div>
          <div className='c-search__close'></div>
        </form>
      </div>
    )
  }
}
