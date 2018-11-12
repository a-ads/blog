import React from 'react'
import ReactPaginate from 'react-paginate'
import Card from './card'
import { withPrefix } from 'gatsby'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.posts = props.posts || []
    this.pageCount = Math.ceil(props.postCount / props.previewsPerPage)
    this.pageIndex = this.props.pageIndex
    this.onPageChange = this.onPageChange.bind(this)
    this.className = 'c-blog-preview'
    this.wrapRef = React.createRef()
  }

  render() {
    return (
      <div ref={this.wrapRef} className={this.className}>
        <div className='l-card-group'>
          <div className='l-card-group__card-container l-container'>
            {this.renderPreviews()}
          </div>
          {/* <div className='l-container'>
            <Subscribe />
          </div> */}
          <div className='l-card-group__pagination-container l-container'>
            {this.renderPagination()}
          </div>
        </div>
      </div>
    )
  }

  renderPreviews() {
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

  renderPagination() {
    return <ReactPaginate 
      containerClassName='c-pagination'
      pageCount={this.pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      activeClassName='--active'
      previousLabel={''}
      nextLabel={''}
      disabledClassName={'--disabled'}
      disableInitialCallback={true}
      onPageChange={this.onPageChange}
      initialPage={this.pageIndex}
      hrefBuilder={(pageIndex) => {
        return withPrefix(`/page-${pageIndex}`)
      }}
    />
  }

  onPageChange({ selected }) {
    const pageIndex = selected + 1
    window.location = withPrefix(`/page-${pageIndex}`)
  }
}
