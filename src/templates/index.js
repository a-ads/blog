import React from 'react'

import Jumbotron from '../components/jumbotron'
import Card from '../components/card'
import AadsServices from '../components/aads-services'
import Pagination from '../components/pagination'
import Subscribe from '../components/subscribe'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.createBlogPostsPreview = this.createBlogPostsPreview.bind(this)
    this.createBlogPostsPreviewMobile = this.createBlogPostsPreviewMobile
                                        .bind(this)
    this.createJumbotron = this.createJumbotron.bind(this)
  }

  createBlogPostsPreview() {
    const {
      totalCount,
    } = this.props.data.blogPosts
    const posts = this.props.data.blogPosts.edges
    const blogPostsPreview = []
    posts.forEach(post => {
      blogPostsPreview.push(
        <Card 
          link={post.node.fields.slug}
          thumbnail={post.node.frontmatter.thumbnail}
          title={post.node.frontmatter.title}
          category={post.node.frontmatter.category}
        />
      )
    })

    return (
      <div className='l-card-group l-card-group--desktop'>
        <div className='l-card-group__card-container l-container'>
          {blogPostsPreview}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          {/* <Pagination /> */}
        </div>
      </div>
    )
  }

  createBlogPostsPreviewMobile() {
    const blogPostsPreviewMobile = []
    const blogPostsPreviewData = [{}, {}, {}, {}, {}, {}]
    blogPostsPreviewData.forEach(() => {
      blogPostsPreviewMobile.push(<Card />)
    })

    return (
      <div className='l-card-group l-card-group--mobile'>
        <div className='l-card-group__card-container l-container'>
          {blogPostsPreviewMobile}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          <div className='c-load-more-btn'>Load more</div>
        </div>
      </div>
    )
  }

  createJumbotron() {
    const { mainJumbotronSlug } = this.props.pathContext
    const posts = this.props.data.blogPosts.edges
    const jumbotronPost = posts[posts.findIndex((post) => {
      return post.node.fields.slug === mainJumbotronSlug
    })]

    if (!jumbotronPost) {
      return
    }

    return (
      <Jumbotron 
        title={jumbotronPost.node.frontmatter.title}
        category={jumbotronPost.node.frontmatter.category}
        link={jumbotronPost.node.fields.slug}
        thumbnail={jumbotronPost.node.frontmatter.thumbnail}
        description={jumbotronPost.node.excerpt}
      />
    )
  }

  render() {
    return (
      <div>
        {this.createJumbotron()}
        {this.createBlogPostsPreview()}
        {this.createBlogPostsPreviewMobile()}
        <div className='l-container'>
          <Subscribe mobile />
        </div>
        <AadsServices />
      </div>
    )
  }
}

export const query = graphql`
  query IndexPageQuery {
    blogPosts: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: {regex: "/\\/(blog)\\//"}}
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            thumbnail
            category
          }
          fields {
            slug
          }
          excerpt
        }
      }
    } 
  }
`
