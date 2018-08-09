import React from 'react'
import BlogPreviewDesktop from './blog-preview-desktop'
import axios from 'axios'

export default class BlogPreviewMobile extends BlogPreviewDesktop {
  constructor(props) {
    super(props)
    this.className = 'l-card-group l-card-group--mobile'
    this.onLoadMoreButtonClick = this.onLoadMoreButtonClick.bind(this)
    this.currentPage = 0
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
    const nextPage = this.currentPage + 1
    axios.get(`/blog-preview-mobile-parts/part-${nextPage}.json`)
    .then(({ data }) => {
      this.setPosts(data)
      this.renderPreviews()
    })
    .catch(error => {
      console.log(error)
    })
    this.setCurrentPage(nextPage)
  }

  renderPreviews() {
    this.setState({
      previews: this.state.previews.concat(this.getPreviews())
    })
  }

  setCurrentPage(value) {
    this.currentPage = value
  }

  isCurrentPageLast() {
    return !(this.pageCount > this.currentPage + 1) 
  }
}
