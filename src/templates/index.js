import React from 'react'

import Jumbotron from '../components/jumbotron'
import AadsServices from '../components/aads-services'
import BlogPreviewDesktop from '../components/blog-preview-desktop'
import BlogPreviewMobile from '../components/blog-preview-mobile'
import Subscribe from '../components/subscribe'
import CONFIG from '../config'

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
            date(formatString: "DD MMMM YYYY")
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

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.createBlogPreviewDesktop()}
        {this.createBlogPreviewMobile()}
        <div className='l-container'>
          <Subscribe mobile />
        </div>
      </div>
    )
  }

  createJumbotron() {
    const jumbotronPost = this.getJumbotronPost()
    if (jumbotronPost)
      return <Jumbotron 
        title={jumbotronPost.node.frontmatter.title}
        category={jumbotronPost.node.frontmatter.category}
        link={jumbotronPost.node.fields.slug}
        thumbnail={jumbotronPost.node.frontmatter.thumbnail}
        description={jumbotronPost.node.excerpt}
      />
  }

  getJumbotronPost() {
    const mainJumbotronSlug = this.props.pathContext.mainJumbotronSlug
    const blogPosts = this.props.data.blogPosts
    return blogPosts.edges[blogPosts.edges.findIndex(post => (
      post.node.fields.slug === mainJumbotronSlug
    ))]
  }

  createBlogPreviewDesktop() {
    const { blogPosts } = this.props.data
    const { previewsPerPage } = CONFIG.blogPreviewDesktop
    const defaultPosts = _.take(
      blogPosts.edges,
      previewsPerPage
    )
    return <BlogPreviewDesktop
      defaultPosts={defaultPosts}
      postCount={blogPosts.totalCount}
      previewsPerPage={CONFIG.blogPreviewDesktop.previewsPerPage}
    />
  }

  createBlogPreviewMobile() {
    const { blogPosts } = this.props.data
    const { previewsPerPage } = CONFIG.blogPreviewMobile
    const defaultPosts = _.take(
      blogPosts.edges,
      previewsPerPage
    )
    return <BlogPreviewMobile
      defaultPosts={defaultPosts}
      postCount={blogPosts.totalCount}
      previewsPerPage={CONFIG.blogPreviewMobile.previewsPerPage}
    />
  }
}
