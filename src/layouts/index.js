import React from 'react'
import Helmet from 'react-helmet'
import _ from 'lodash'
import { connect } from 'react-redux'

import Header from '../containers/header'
import Footer from '../components/footer.js'
import '../styles/main.scss'

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }

    allBlogCategories: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: {regex: "/\\/(blog_categories)\\//"}}
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
      filter: {fileAbsolutePath: {regex: "/\\/(blog)\\//"}}
    ) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`

export default class extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata
    const { children } = this.props
    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header 
          categories={this.getActualBlogCategories()}
        />
        <div className='l-body'>
          {children()}
        </div>
        <Footer />
      </div>
    )
  }

  getActualBlogCategories() {
    const {
      allBlogCategories
    } = this.props.data
    return _.filter(
      allBlogCategories.edges, 
      category => this.isBlogCategoryActual(category)
    )
  }

  isBlogCategoryActual(category) {
    const blogPostsGroupedByCategory = 
      this.props.data.blogPostsGroupedByCategory
    const blogPostIndex = blogPostsGroupedByCategory.group
      .map(post => post.fieldValue)
      .indexOf(category.node.frontmatter.title)
    if (blogPostIndex !== -1)
      return true
  }
}
