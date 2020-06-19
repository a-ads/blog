import React from 'react'
import { connect } from 'react-redux'
import Layout from '../layouts/index'
import Card from '../components/card'
import { getCurrentURL, getURLParamValue } from '../helpers'
import SearchResult from '../components/search-result'
import { withPrefix } from "gatsby"
import Axios from 'axios'
import * as JsSearch from 'js-search'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postList: []
    }
    this.searchResults = []
  }

  render() {
    const renderedSearchResults = this.getRenderedSearchResults()

    return (
      <Layout>
        <SearchResult
          searchResultEmpty={!renderedSearchResults.length}
          renderedSearchResults={renderedSearchResults}
          searchQuery={this.props.search.query}
        />
      </Layout>
    )
  }

  async componentDidMount() {
    this.changeSearchQueryFromURLParam()
    Axios.get(withPrefix('/search.json'))
      .then(res => {
        this.setState({
          postList: res.data
        })
      })
  }

  changeSearchQueryFromURLParam() {
    const searchQuery = getURLParamValue('search-query', getCurrentURL())
    if (this.isSearchQueryValid(searchQuery)) {
      this.props.changeSearchQuery(searchQuery)
    }
  }

  setSearchResults = () => {
    const { postList } = this.state
    const dataToSearch = new JsSearch.Search("title")
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("title")
    dataToSearch.addDocuments(postList)
    dataToSearch.addIndex("title")
    dataToSearch.addIndex("fullExcerpt")
    dataToSearch.addIndex("tags")
    this.searchResults = dataToSearch.search(this.props.search.query)
  }

  isSearchQueryValid(query) {
    return !!query
  }

  isSearchResultEmpty() {
    return this.searchResults.length === 0
  }

  getRenderedSearchResults() {
    this.setSearchResults()

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
