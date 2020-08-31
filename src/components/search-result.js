import React from 'react'

export default class SearchResult extends React.Component {
  render() {
    const {
      searchResultEmpty,
      searchQuery,
      renderedSearchResults
    } = this.props

    return(
      <div className='c-search-result'>
        <div className='l-container'>
          {!searchResultEmpty ?
            <div>
              <h1 className='c-search-result__title'>Search results for {`«${searchQuery}»`}</h1>
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
            {renderedSearchResults}
          </div>
        </div>
      </div>
    )
  }
}
