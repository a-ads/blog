import React from 'react'
import { graphql } from 'gatsby'
import * as R from 'ramda'
import cn from 'classnames'

import MainLayout from '/src/layouts/MainLayout'
import ArticleCard from '/src/components/ArticleCard/ArticleCard'
import MarketplaceBanner from '/src/components/MarketplaceBanner/MarketplaceBanner'
import AdvertiserBanner from '/src/components/AdvertiserBanner/AdvertiserBanner'
import PublisherBanner from '/src/components/PublisherBanner/PublisherBanner'
import ContactChannels from '/src/components/ContactChannels/ContactChannels'
import * as css from '/src/styles/templates/categories.module.scss'

const Categories = ({
  data,
  pageContext
}) => {
  const {
    categoryTopLevel
  } = pageContext

  return <MainLayout>
    <div className={css.categories}>
      <div className={cn(css.container, 'container')}>
        <h1 className={css.pageTitle}>Cryptocurrency {categoryTopLevel}</h1>

        <div className={css.articleListWrap}>
          <div className={css.articles}>
            {data.allMarkdownRemark.edges.map(({ node }, index) => {
              return <ArticleCard
                large={index === 0}
                slug={node.fields.slug}
                picSrc={node.frontmatter.thumbnail?.childImageSharp.fixed}
                title={node.frontmatter.title}
                category={R.take(1, node.frontmatter.category_top_level)}
              />
            })}
          </div>
        </div>

        <div className={css.marketplaceBannerWrap}>
          <MarketplaceBanner />
        </div>

        <div className={css.bannersWrap}>
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
  query($categoryTopLevel: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" }
        frontmatter: { category_top_level: { in: [$categoryTopLevel] } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                fixed(width: 800) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            category_top_level
          }
        }
      }
    }
  }
`

export default Categories
