import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/header.js'
import Footer from '../components/footer.js'
import '../styles/main.scss'

export default ({ children, data }) => {
  const title = data.site.siteMetadata.title;
  
  const { allBlogCategories, blogPostsGroupedByCategory } = data
  const blogCategories = []
  allBlogCategories.edges.forEach(category => {
    const categoryIndex = blogPostsGroupedByCategory.group.map(el => {
      return el.fieldValue
    })
    .indexOf(category.node.frontmatter.title)
    if (categoryIndex !== -1) {
      blogCategories.push(category)
    }
  })

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header categories={blogCategories} />
      <div className='l-body'>
        {children()}
      </div>
      <Footer />
    </div>
  )
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
      filter: {fileAbsolutePath: {regex: "/^\\/.*\\/(blog_categories)\\/.*\\.md$/"}}
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
      filter: {fileAbsolutePath: {regex: "/^\\/.*\\/(blog)\\/.*\\.md$/"}}
    ) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`
