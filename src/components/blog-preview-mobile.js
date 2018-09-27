import React from 'react'
import BlogPreviewDesktop from './blog-preview-desktop'
import axios from 'axios'

export default class BlogPreviewMobile extends BlogPreviewDesktop {
  constructor(props) {
    super(props)
    this.className = 'c-blog-preview c-blog-preview--mobile'
    this.onLoadMoreButtonClick = this.onLoadMoreButtonClick.bind(this)
    this.currentPageNumber = 0
  }

  createPagination() {
    if (!this.isCurrentPageLast())
      return  <div className='c-load-more-btn'
        onClick={this.onLoadMoreButtonClick}  
      >
        Load more
      </div>
  }

  onLoadMoreButtonClick() {
    const nextPageNumber = this.currentPageNumber + 1
    axios.get(`/blog-preview-mobile-parts/part-${nextPageNumber}.json`)
    .then(({ data }) => {
      this.setPosts(data)
      this.renderPreviews()
    })
    .catch(error => {
      console.log(error)
    })
    this.setCurrentPage(nextPageNumber)
  }

  renderPreviews() {
    this.setState({
      previews: this.state.previews.concat(this.getPreviews())
    })
  }

  setCurrentPage(value) {
    this.currentPageNumber = value
  }

  isCurrentPageLast() {
    return this.pageCount <= this.currentPageNumber + 1 
  }
}
