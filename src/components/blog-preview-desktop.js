import React from 'react'
import ReactPaginate from 'react-paginate'
import Card from './card'
import Subscribe from './subscribe'
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
    this.className = 'c-blog-preview c-blog-preview--desktop'
    this.wrapRef = React.createRef()
  }

  render() {
    return (
      <div ref={this.wrapRef} className={this.className}>
        <div className='l-card-group l-card-group--desktop'>
          <div className='l-card-group__card-container l-container'>
            {this.state.previews}
          </div>
          <div className='l-container'>
            <Subscribe />
          </div>
          <div className='l-card-group__pagination-container l-container'>
            {this.createPagination()}
          </div>
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
    return this.posts.map((post, index) => {
      let additionalClassName = '';
      switch (index) {
      case 0:
        additionalClassName = 'c-card--large'
      break;
      case 7:
        additionalClassName = 'c-card--double'
      break;
      }
      return <Card 
        key={index}
        link={post.node.fields.slug}
        thumbnail={post.node.frontmatter.thumbnail}
        title={post.node.frontmatter.title}
        category={post.node.frontmatter.category}
        date={post.node.frontmatter.date}
        additionalClassName={additionalClassName}
        excerpt={post.node.excerpt}
      />
    })
  }

  createPagination() {
    return <ReactPaginate 
      containerClassName='c-pagination'
      pageCount={this.pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      activeClassName='--active'
      onPageChange={this.onPageChange}
      previousLabel={''}
      nextLabel={''}
      disabledClassName={'--disabled'}
      disableInitialCallback={true}
    />
  }

  onPageChange({ selected }) {
    axios.get(`/blog-preview-parts/part-${selected}.json`)
    .then(({ data }) => {
      this.setPosts(data)
      this.renderPreviews()
      window.scroll({
        top: this.wrapRef.current.offsetTop, 
        left: 0,
        behavior: 'smooth' 
      });
    })
    .catch(error => {
      console.log(error)
    })
  }

  setPosts(posts) {
    this.posts = posts
  }
}
