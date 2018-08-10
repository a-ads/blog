import React from 'react'
import { Index } from 'elasticlunr'
import { connect } from 'react-redux'

import Card from '../components/card'
import { getURLParamValue } from '../helpers'

export const query = graphql`
  query SearchPageQuery {
    siteSearchIndex {
      index
    }
  }
`

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.Index = Index.load(this.props.data.siteSearchIndex.index)
    this.searchResults = []
  }

  render() {
    this.setSearchResults()

    return (
      <div className='c-search-result'>
        <div className='l-container'>
          {!this.isSearchResultsEmpty() ?
            <div>
              <h1 className='c-search-result__title'>Search results for:</h1>
              <p className='h1-like c-search-result__query'>{this.props.search.query}</p>
            </div>
            :
            <div>
              <p className='h1-like c-search-result__query'>Nothing found</p>
              <p className="c-search-result__sorry">
                Sorry, but nothing matched your search terms. 
                Please try again with some different keywords.
              </p>
            </div>
          }
        </div>
        <div className='l-card-group'>
          <div className='l-card-group__card-container l-container'>
            {this.createSearchResults()}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.changeSearchQueryFromURLParam()
  }

  changeSearchQueryFromURLParam() {
    const searchQuery = getURLParamValue('search-query', location.href)
    this.props.changeSearchQuery(searchQuery)
  }

  setSearchResults = () => {
    this.searchResults = this.Index.search(this.props.search.query, {})
    .map(({ ref }) => {
      return this.Index.documentStore.getDoc(ref)
    })
  }

  isSearchResultsEmpty() {
    return this.searchResults.length === 0
  }

  createSearchResults() {
    return this.searchResults.map((result, key) => (
      <Card 
        key={key}
        link={result.slug}
        thumbnail={result.thumbnail}
        title={result.title}
        category={result.category}
      />
    ))
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
