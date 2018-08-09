import React from 'react'
import ReactPaginate from 'react-paginate'
import Card from './card'
import axios from 'axios'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.posts = props.defaultPosts || []
    this.pageCount = Math.ceil(props.postCount / props.previewsPerPage)
    this.state = {
      previews: []
    }
    this.onPageChange = this.onPageChange.bind(this)
    this.className = 'l-card-group l-card-group--desktop'
  }

  render() {
    return (
      <div className={this.className}>
        <div className='l-card-group__card-container l-container'>
          {this.state.previews}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          {this.createPagination()}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.renderPreviews()
  }

  renderPreviews() {
    this.setState({
      previews: this.getPreviews()
    })
  }

  getPreviews() {
    return this.posts.map(post => (
      <Card 
        link={post.node.fields.slug}
        thumbnail={post.node.frontmatter.thumbnail}
        title={post.node.frontmatter.title}
        category={post.node.frontmatter.category}
      />
    ))
  }

  createPagination() {
    return <ReactPaginate 
      containerClassName='c-pagination'
      pageCount={this.pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={3}
      activeClassName='--active'
      onPageChange={this.onPageChange}
      previousLabel={'<'}
      nextLabel={'>'}
      disabledClassName={'--disabled'}
      disableInitialCallback={true}
    />
  }

  onPageChange({ selected }) {
    axios.get(`/blog-preview-parts/part-${selected}.json`)
    .then(({ data }) => {
      this.setPosts(data)
      this.renderPreviews()
    })
    .catch(error => {
      console.log(error)
    })
  }

  setPosts(posts) {
    this.posts = posts
  }
}
