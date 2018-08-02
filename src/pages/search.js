import React from 'react'
import { Index } from 'elasticlunr'
import PublishSubscribe from 'publish-subscribe-js'

import Card from '../components/card'
import { getURLParamValue } from '../helpers'
import {
  SEARCH_COMPONENT_QUERY_CHANGE,
  SEARCH_PAGE_GET_SEARCH_QUERY
} from '../constants'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: '',
      searchResults: []
    };
    this.Index = Index.load(this.props.data.siteSearchIndex.index)
  }

  componentDidMount() {
    PublishSubscribe.subscribe(SEARCH_COMPONENT_QUERY_CHANGE, event => {
      this.search(event.target.value)
    })

    const searchQuery = getURLParamValue('search-query', location.href)
    if (searchQuery) {
      PublishSubscribe.publish(
        SEARCH_PAGE_GET_SEARCH_QUERY, 
        searchQuery
      )
      this.search(searchQuery)
    }
  }

  search = (searchQuery) => {
    this.setState({
      searchQuery,
      searchResults:  this.Index.search(searchQuery, {})
                      .map(({ ref }) => {
                        return this.Index.documentStore.getDoc(ref)
                      })
    })
  }

  isSearchResultsEmpty() {
    return this.state.searchResults.length === 0
  }

  render() {
    return (
      <div className='c-search-result'>
        <div className='l-container'>
          {!this.isSearchResultsEmpty() ?
            <div>
              <h1 className='c-search-result__title'>Search results for:</h1>
              <p className='h1-like c-search-result__query'>{this.state.searchQuery}</p>
            </div>
            :
            <div>
              <p className='h1-like c-search-result__query'>Nothing found</p>
              <p class="c-search-result__sorry">
                Sorry, but nothing matched your search terms. 
                Please try again with some different keywords.
              </p>
            </div>
          }
        </div>
        <div className='l-card-group l-card-group--desktop'>
          <div className='l-card-group__card-container l-container'>
            {this.state.searchResults.map(result => {
              return  <Card 
                        link={result.slug}
                        thumbnail={result.thumbnail}
                        title={result.title}
                        category={result.category}
                      />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query SearchPageQuery {
    siteSearchIndex {
      index
    }
  }
`
