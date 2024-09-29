import React from 'react'
import cn from 'classnames'
import { graphql } from 'gatsby'
import * as R from 'ramda'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination as SwiperPaginationModule } from 'swiper/modules'
import "swiper/css/bundle"
import 'swiper/css/pagination'
import Seo from '/src/components/Seo/Seo'

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

export const Head = () => {
  return <Seo />
}

const IndexPage = ({
  data,
  pageContext
}) => {
  const posts = data.allMarkdownRemark.edges
  const mostPopularPosts = data.mostPopular.edges

  return <MainLayout>
    <div className={css.mainPage}>
      <div className={cn('container')}>
        <h1 className={css.pageTitle}>AADS Crypto Blog</h1>

        <div className={css.articleListWrap}>
          <div className={'article-list-layout'}>
            {R.pipe(R.take(4), mapIndexed(({ node }, index) => {
              return <ArticleCard
                key={`article-${node.fields.slug}`}
                large={index === 0}
                postNode={node}
              />
            }))(posts)}
          </div>

          <div className={cn(css.bannerWrap)}>
            <TrafficMonetizationBanner />
          </div>

          <div className={'article-list-layout'}>
            {R.pipe(R.drop(4), R.take(4), mapIndexed(({ node }, index) => {
              return <ArticleCard
                key={`article-${node.fields.slug}`}
                large={index === 0}
                postNode={node}
              />
            }))(posts)}
          </div>

          <div className={css.paginationWrap}>
            <Pagination
              currentPage={pageContext.currentPage}
              totalPages={pageContext.numPages}
            />
          </div>
        </div>
      </div>

      <div className='container'>
        <div className={css.mostPopular}>
          <h3 className={css.title}>Most popular</h3>

          <div className={cn('article-list-layout', 'phone-hidden')}>
            {mostPopularPosts.map(({ node }) => {
              return <ArticleCard
                key={`most-popular-${node.fields.slug}`}
                postNode={node}
              />
            })}
          </div>
          
          <div className={cn(css.sliderWrap, 'phone-visible')}>
            <Swiper
              className={css.slider}
              spaceBetween={20}
              modules={[SwiperPaginationModule]}
              pagination={{
                clickable: true,
              }}
            >
              {mostPopularPosts.map(({ node }) => {
                return <SwiperSlide
                  className={css.sliderItem}
                  key={`most-popular-${node.fields.slug}`}
                >
                  <ArticleCard
                    postNode={node}
                    className={css.mostPopularMobileCard}
                  />
                </SwiperSlide>
              })}
            </Swiper>
          </div>
        </div>

        <div className={cn('desktop-visible', css.marketplaceBannerWrap)}>
          <MarketplaceBanner />
        </div>
      </div>
      <div className='phone-visible'>
        <TrafficMonetizationBanner />
      </div>
      <div className='container'>
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
      filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" } }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
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
            reading_time
            thumbnail {
              childImageSharp {
                fixed(width: 720) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            category_top_level
          }
          excerpt(pruneLength: 220)
        }
      }
    }
    mostPopular: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" } }
      sort: { frontmatter: { popularity: DESC } }
      limit: 6
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
            thumbnail {
              childImageSharp {
                fixed(width: 720) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            popularity
            category_top_level
            reading_time
          }
          excerpt(pruneLength: 220)
        }
      }
    }
  }
`

export default IndexPage
