import React from 'react'

import BlogPreview from '../components/blog-preview'
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
        {this.createBlogPreview()}
      </div>
    )
  }

  createBlogPreview() {
    const { blogPosts } = this.props.data
    const { previewsPerPage } = CONFIG.blogPreviewDesktop
    const defaultPosts = _.take(
      blogPosts.edges,
      previewsPerPage
    )
    return <BlogPreview
      defaultPosts={defaultPosts}
      postCount={blogPosts.totalCount}
      previewsPerPage={CONFIG.blogPreviewDesktop.previewsPerPage}
    />
  }
}
