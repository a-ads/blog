import React from 'react'
import { Index } from 'elasticlunr'

import Card from '../components/card'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: 'test',
      searchResults: []
    };
    this.index = {}
  }

  componentDidMount() {
    this.search('hot_streets')
  }

  getOrCreateIndex = () =>  this.Index
                            ? this.Index
                            : Index.load(this.props.data.siteSearchIndex.index)

  search = (searchQuery) => {
    this.index = this.getOrCreateIndex()
    this.setState({
      searchQuery,
      searchResults:  this.index.search(searchQuery)
                      .map(({ ref }) => {
                        return this.index.documentStore.getDoc(ref)
                      })
    })
  }

  render() {
    return (
      <div className='c-search-result'>
        <div className='l-container'> 
          <h1 className='c-search-result__title'>Search results for:</h1>
          <p className='h1-like c-search-result__query'>{this.state.searchQuery}</p>
        </div>
        <div className='l-card-group l-card-group--desktop'>
          <div className='l-card-group__card-container l-container'>
            {this.state.searchResults.map(result => {
              return <Card 
                        link={result.slug}
                        thumbnail={result.thumbnail}
                        title={result.title}
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
