import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import * as R from 'ramda'
import cn from 'classnames'

import MainLayout from '/src/layouts/MainLayout'
import MarketplaceBanner from '/src/components/MarketplaceBanner/MarketplaceBanner'
import AdvertiserBanner from '/src/components/AdvertiserBanner/AdvertiserBanner'
import PublisherBanner from '/src/components/PublisherBanner/PublisherBanner'
import ContactChannels from '/src/components/ContactChannels/ContactChannels'
import Seo from '/src/components/Seo/Seo'
import * as css from '/src/styles/templates/authors.module.scss'

const getArticlesCountByAuthorName = (authorName, articlesByAuthor) => {
  return R.pipe(
    R.find(R.propEq(authorName, 'fieldValue')),
    R.pathOr(0, ['totalCount'])
  )(articlesByAuthor)
}

export function Head() {
  return (
    <Seo
      title='AADS Authors'
      description='Read the articles by our authors.'
    />
  )
}

const Authors = ({
  data
}) => {
  const authors = data.allMarkdownRemark.edges
  const articlesByAuthor = data.articlesByAuthor.group

  return <MainLayout>
    <div className={css.authors}>
      <div className={cn(css.container, 'container')}>
        <h1 className={css.title}>Authors</h1>

        <div className={css.authorsWrapper}>
          {authors.map(({ node }) => {
            const articlesCount = getArticlesCountByAuthorName(node.frontmatter.name, articlesByAuthor)

            return <Link key={node.fields.slug} to={node.fields.slug} className={css.author}>
              <div className={css.pic}>
                <Img
                  fixed={node.frontmatter.thumbnail?.childImageSharp.fixed}
                />
              </div>
              <h2 className={css.name}>{node.frontmatter.name}</h2>
              <p className={css.position}>{node.frontmatter.position}</p>
              <p className={css.articlesNum}>
                {articlesCount > 0
                  ? `${articlesCount} articles written`
                  : 'No articles yet'
                }
              </p>
            </Link>
          })}
        </div>

        <div className={cn(css.marketplaceBannerWrap, 'desktop-visible')}>
          <MarketplaceBanner />
        </div>

        <div className={cn(css.bannersWrap, 'desktop-visible --flex')}>
          <AdvertiserBanner/>
          <PublisherBanner/>
        </div>

        <div className={css.contactsWrap}>
          <ContactChannels />
        </div>
      </div>
    </div>
  </MainLayout>
}

export const pageQuery = graphql`
  query blogListQuery {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/^.*/content/authors/.*.md$/"}}
    ) {
      edges {
        node {
          fields {
            slug
          }
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
          }
        }
      }
    }
    articlesByAuthor: allMarkdownRemark {
      group(field: {frontmatter: {author: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`

export default Authors
