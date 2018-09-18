import React from 'react'
import Card from '../components/card'

const TagPage = ({ pathContext, data }) => {
  const { tag } = pathContext
  return (
    <div className='c-tag-page'>
      <div className='l-container'>
        <h1>{tag}</h1>
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
    </div>
  )
}

export default TagPage

export const pageQuery = graphql`
  query tagPageQuery($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
