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
    axios.get(`/blog-preview-mobile-parts/part-${this.currentPage + 1}.json`)
    .then(({ data }) => {
      this.setPosts(data)
      this.renderPreviews()
    })
    .catch(error => {
      console.log(error)
    })
    this.setCurrentPage(this.currentPage + 1)
  }

  setPosts(posts) {
    this.posts = this.posts.concat(posts)
  }

  setCurrentPage(value) {
    this.currentPage = value
  }

  isCurrentPageLast() {
    return !(this.pageCount > this.currentPage + 1) 
  }
}
