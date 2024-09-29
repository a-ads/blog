import React from 'react'
import { graphql } from 'gatsby'
import cn from 'classnames'

import getCategoryPath from '/src/utils/get-category-path'
import MainLayout from '/src/layouts/MainLayout'
import CategoriesSecondLevel from '/src/components/CategoriesSecondLevel/CategoriesSecondLevel'
import ArticleCard from '/src/components/ArticleCard/ArticleCard'
import Pagination from '/src/components/Pagination/Pagination'
import MarketplaceBanner from '/src/components/MarketplaceBanner/MarketplaceBanner'
import AdvertiserBanner from '/src/components/AdvertiserBanner/AdvertiserBanner'
import PublisherBanner from '/src/components/PublisherBanner/PublisherBanner'
import ContactChannels from '/src/components/ContactChannels/ContactChannels'
import TrafficMonetizationBanner from '/src/components/TrafficMonetizationBanner/TrafficMonetizationBanner'
import Seo from '/src/components/Seo/Seo'
import * as css from '/src/styles/templates/categories.module.scss'

export function Head({ data: { currentCategory } }) {
  const categoryObj = currentCategory.edges[0].node

  return (
    <Seo
      title={categoryObj.html_title}
      description={categoryObj.meta_description}
    />
  )
}

const Categories = ({
  data,
  pageContext
}) => {
  const {
    categoryTopLevel
  } = pageContext
  const categoriesSecondLevel = data.allBlogCategoriesSecondLevelYaml.edges

  return <MainLayout>
    <div className={css.categories}>
      <div className={cn(css.container, 'container')}>
        <h1 className={css.pageTitle}>Cryptocurrency {categoryTopLevel}</h1>

        {categoryTopLevel === 'Guides' && <div className={css.categoriesListWrap}>
          <CategoriesSecondLevel
            categories={categoriesSecondLevel}
            currentCategory={'All'}
          />
        </div>}

        <div className={css.articleListWrap}>
          <div className={cn(css.articles, 'article-list-layout')}>
            {data.allMarkdownRemark.edges.map(({ node }, index) => {
              return <ArticleCard
                key={`categories-${node.fields.slug}-${index}`}
                large={index === 0}
                postNode={node}
              />
            })}
          </div>
        </div>

        {pageContext.numPages > 1 && <div className={css.paginationWrap}>
          <Pagination
            basePath={getCategoryPath(categoryTopLevel)}
            currentPage={pageContext.currentPage}
            totalPages={pageContext.numPages}
          />
        </div>}

        <div className={cn(css.marketplaceBannerWrap, 'desktop-visible')}>
          <MarketplaceBanner />
        </div>

        <div className={cn(css.bannersWrap, 'desktop-visible --flex')}>
          <AdvertiserBanner/>
          <PublisherBanner/>
        </div>

        <div className={cn(css.contactsWrap, 'desktop-visible')}>
          <ContactChannels />
        </div>
      </div>
      <div className='phone-visible'>
        <TrafficMonetizationBanner />
      </div>
    </div>
  </MainLayout>
}

export const pageQuery = graphql`
  query($categoryTopLevel: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
      filter: {
        fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" }
        frontmatter: { first_category_top_level: { in: [$categoryTopLevel] } }
      }
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
            category_top_level
          }
          excerpt(pruneLength: 220)
        }
      }
    }
    currentCategory: allBlogCategoriesTopLevelYaml(
      filter: {
        title: {eq: $categoryTopLevel}
      }
    ) {
      edges {
        node {
          title
          h1
          html_title
        }
      }
    }
    allBlogCategoriesSecondLevelYaml {
      edges {
        node {
          title
          h1
          html_title
          breadcrumb
          meta_description
          order
          parent_category
        }
      }
    }
  }
`

export default Categories
