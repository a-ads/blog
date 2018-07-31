import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/header.js'
import Footer from '../components/footer.js'
import '../styles/main.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.getBlogCategories = this.getBlogCategories.bind(this)
  }

  getBlogCategories() {
    const {
      allBlogCategories,
      blogPostsGroupedByCategory
    } = this.props.data
    const blogCategories = []
    allBlogCategories.edges.forEach(category => {
      const categoryIndex = blogPostsGroupedByCategory.group.map(post => {
        return post.fieldValue
      })
      .indexOf(category.node.frontmatter.title)
      if (categoryIndex !== -1) {
        blogCategories.push(category)
      }
    })

    return blogCategories
  }

  render() {
    const { 
      title,
      children
    } = this.props
    
    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header categories={this.getBlogCategories()} />
        <div className='l-body'>
          {children()}
        </div>
        <Footer />
      </div>
    )
  }
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }

    allBlogCategories: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: {regex: "/.*\\/(blog_categories)\\//"}}
    ) {
      edges {
        node {
          frontmatter {
            title,
            order
          }
        }
      }
    }

    blogPostsGroupedByCategory: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/.*\\/(blog)\\//"}}
    ) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`
