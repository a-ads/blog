import React from 'react'
import Card from '../components/card'

const CategoryPage = ({ pathContext, data }) => {
  const { category } = pathContext
  return (
    <div className='c-post-section'>
      <div className='l-container'>
        <h1 className='c-post-section__title'>{category}</h1>
      </div>
      
      <div className='l-card-group'>
        <div className='l-card-group__card-container l-container'>
          {data.allMarkdownRemark.edges.map((edge, key) => {
            const { node } = edge
            return (
              <Card
                key={key}
                link={node.fields.slug}
                thumbnail={node.frontmatter.thumbnail}
                title={node.frontmatter.title}
                category={node.frontmatter.category}
                date={node.frontmatter.date}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

export const pageQuery = graphql`
  query categoryPageQuery($category: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title,
            thumbnail,
            category,
            date(formatString: "DD MMMM YYYY")
          },
          fields {
            slug
          }
        }
      }
    }
  }
`
