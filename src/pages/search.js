import React from 'react'
// import { Index } from 'elasticlunr'
import { connect } from 'react-redux'

import Layout from '../layouts/index'
import Card from '../components/card'
import { getCurrentURL, getURLParamValue } from '../helpers'
import SearchResult from '../components/search-result'

// export const query = graphql`
//   query SearchPageQuery {
//     siteSearchIndex(pages: {regex: "//blog//"}) {
//       index
//     }
//   }
// `

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

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.searchResults = []
  }

  render() {
    this.setSearchResults()

    return (
      <Layout>
        <SearchResult 
          searchResultEmpty={this.isSearchResultEmpty()}
          renderedSearchResults={this.getRenderedSearchResults()}
          searchQuery={this.props.search.query}
        />
      </Layout>
    )
  }

  componentDidMount() {
    this.changeSearchQueryFromURLParam()
  }

  changeSearchQueryFromURLParam() {
    const searchQuery = getURLParamValue('search-query', getCurrentURL())
    if (this.isSearchQueryValid(searchQuery)) {
      this.props.changeSearchQuery(searchQuery)
    }
  }

  setSearchResults = () => {
    const searchQuery = this.props.search.query
    if (this.isSearchQueryValid(searchQuery)) {
      const lunrIndex = window.__LUNR__['en'];
      this.searchResults = lunrIndex.index.search(searchQuery)
      .map(({ ref }) => {
        return lunrIndex.store[ref]
      })
    } else {
      this.searchResults = []
    }
  }

  isSearchQueryValid(query) {
    return !!query
  }

  isSearchResultEmpty() {
    return this.searchResults.length === 0
  }

  getRenderedSearchResults() {
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
