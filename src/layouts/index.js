import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, withPrefix } from 'gatsby'
import _ from 'lodash'
import Header from '../containers/header'
import Footer from '../components/footer.js'
import '../styles/main.scss'

export default class extends React.Component {
  render() {
    const { children } = this.props
    return (
      <StaticQuery 
        query={graphql`
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
        }
        render={data => {
          this.data = data
          return (
            <div>
              <Helmet>
                <title>{data.site.siteMetadata.title}</title>
                <link rel='icon' type='image/png' href={withPrefix('/images/favicon.png')} />
                <link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,600,700|Open+Sans:400,600,700' rel='stylesheet' />
              </Helmet>
              <Header 
                categories={this.getUsedBlogCategories()}
              />
              <div className='l-body'>
                {children}
              </div>
              <Footer />
            </div>
          )
        }}
      />
    )
  }

  getUsedBlogCategories() {
    const {
      allBlogCategories
    } = this.data
      
    return _.filter(
      allBlogCategories.edges, 
      categoryEdge => this.isBlogCategoryUsed(categoryEdge.node.title)
    )
  }

  isBlogCategoryUsed(categoryTitle) {
    const blogPostsGroupedByCategory = this.data.blogPostsGroupedByCategory
    const blogPostIndex = blogPostsGroupedByCategory.group
      .map(post => post.fieldValue)
      .indexOf(categoryTitle)
    if (blogPostIndex !== -1) 
      return true
  }
}
