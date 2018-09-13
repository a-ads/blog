import React from 'react'
import Helmet from 'react-helmet'
import _ from 'lodash'

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

    allBlogCategories: allBlogCategoriesYaml {
      edges {
        node {
          title
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
    const usedBlogCategories = this.getUsedBlogCategories()

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <link rel='icon' type='image/png' href='/images/favicon.png' />
          <link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,600,700|Open+Sans:400,600,700' rel='stylesheet' />
        </Helmet>
        <Header 
          categories={usedBlogCategories}
        />
        <div className='l-body'>
          {children()}
        </div>
        <Footer />
      </div>
    )
  }

  getUsedBlogCategories() {
    const {
      allBlogCategories
    } = this.props.data
    return _.filter(
      allBlogCategories.edges, 
      categoryEdge => this.isBlogCategoryUsed(categoryEdge.node.title)
    )
  }

  isBlogCategoryUsed(categoryTitle) {
    const blogPostsGroupedByCategory = this.props.data.blogPostsGroupedByCategory
    const blogPostIndex = blogPostsGroupedByCategory.group
      .map(post => post.fieldValue)
      .indexOf(categoryTitle)
    if (blogPostIndex !== -1) 
      return true
  }
}
