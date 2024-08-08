import React from 'react'
import cn from 'classnames'
import { graphql } from 'gatsby'
import * as R from 'ramda'

import MainLayout from '/src/layouts/MainLayout'
import ArticleCard from '/src/components/ArticleCard/ArticleCard'
import TrafficMonetizationBanner from '/src/components/TrafficMonetizationBanner/TrafficMonetizationBanner'
import MarketplaceBanner from '/src/components/MarketplaceBanner/MarketplaceBanner'
import Pagination from '/src/components/Pagination/Pagination'
import AdvertiserBanner from '/src/components/AdvertiserBanner/AdvertiserBanner'
import PublisherBanner from '/src/components/PublisherBanner/PublisherBanner'
import ContactChannels from '/src/components/ContactChannels/ContactChannels'
import * as css from '/src/styles/templates/index.module.scss'

const mapIndexed = R.addIndex(R.map)

const IndexPage = ({
  data,
  pageContext
}) => {
  return <MainLayout>
    <div className={css.mainPage}>
      <div className={cn('container')}>
        <h1 className={css.pageTitle}>AADS Crypto Blog</h1>

        <div className={css.articleListWrap}>
          <div className={css.articles}>
            {R.pipe(R.take(4), mapIndexed(({ node }, index) => {
              return <ArticleCard
                large={index === 0}
                slug={node.fields.slug}
                picSrc={node.frontmatter.thumbnail?.childImageSharp.fixed}
                title={node.frontmatter.title}
                category={R.take(1, node.frontmatter.category_top_level)}
              />
            }))(data.allMarkdownRemark.edges)}
          </div>

          <div className={css.bannerWrap}>
            <TrafficMonetizationBanner />
          </div>

          <div className={css.articles}>
            {R.pipe(R.drop(4), R.take(4), mapIndexed(({ node }, index) => {
              return <ArticleCard
                large={index === 0}
                slug={node.fields.slug}
                picSrc={node.frontmatter.thumbnail?.childImageSharp.fixed}
                title={node.frontmatter.title}
                category={R.take(1, node.frontmatter.category_top_level)}
              />
            }))(data.allMarkdownRemark.edges)}
          </div>

          <div className={css.paginationWrap}>
            <Pagination 
              currentPage={pageContext.currentPage}
              totalPages={pageContext.numPages}
              onPageChange={() => {}}
            />
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
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" } }
      limit: $limit
      skip: $skip
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
                fixed {
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

export default IndexPage

export const Head = () => <title>Home Page</title>
