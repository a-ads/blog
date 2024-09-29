import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import cn from 'classnames'

import MainLayout from '/src/layouts/MainLayout'
import ArticleCard from '/src/components/ArticleCard/ArticleCard'
import Seo from '/src/components/Seo/Seo'
import * as css from '/src/styles/templates/author.module.scss'

export function Head({ data }) {
  const author = data.markdownRemark

  return (
    <Seo title={author.frontmatter.name} description={`${author.frontmatter.description}`}>
      {author.frontmatter.json_ld && <script type='application/ld+json'>{author.frontmatter.json_ld}</script>}
    </Seo>
  )
}

const Author = ({
  data
}) => {
  const author = data.markdownRemark
  const authorPosts = data.authorPosts.edges

  return <MainLayout>
    <div className={css.author}>
      <div className={cn(css.breadcrumbsContainer, 'container')}>
        <div className={cn(css.breadcrumbs, 'breadcrumbs')}>
          <Link to="/">Blog</Link>
          <span className='breadcrumbs__dot' />
          <Link to='/authors/'>
            Authors
          </Link>
        </div>
      </div>

      <div className={cn('container')}>
        <div className={css.wrapper}>
          <div className={css.sidebar}>
            <div className={css.pic}>
              <Img
                fixed={author.frontmatter.thumbnail?.childImageSharp.fixed}
              />
            </div>
          </div>
          <div className={css.main}>
            <h1 className={css.title}>{author.frontmatter.name}</h1>
            <p className={css.position}>{author.frontmatter.position}</p>

            <div
              className={css.content}
              dangerouslySetInnerHTML={{__html: author.html}}
            />
          </div>
        </div>
      </div>

      <div className={cn(css.articlesContainer, 'container')}>
        <h2>{author.frontmatter.name}’s articles</h2>

        <div className={cn(css.articles, 'article-list-layout')}>
          {authorPosts.map(({ node }) =>
            <ArticleCard
              key={`article-${node.fields.slug}`}
              postNode={node}
            />
          )}
        </div>
      </div>
    </div>
  </MainLayout>
}

export const pageQuery = graphql`
  query($slug: String!, $authorName: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        position
        thumbnail {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
        description
        facebook_link
        twitter_link
        linkedin_link
        json_ld
      }
      html
    }
    authorPosts: allMarkdownRemark(
      filter: { frontmatter: { author: { eq: $authorName } } }
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            category_top_level
            author
            thumbnail {
              childImageSharp {
                fixed(width: 720) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          excerpt(pruneLength: 220)
        }
      }
    }
  }
`

export default Author
