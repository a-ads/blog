import React, { useEffect, useContext, useMemo, useState } from 'react'
import { graphql } from 'gatsby'
import cn from 'classnames'
import Fuse from 'fuse.js'

import MainLayout from '/src/layouts/MainLayout'
import ArticleCard from '/src/components/ArticleCard/ArticleCard'
import { SearchContext } from '/src/context/SearchContext'
import Seo from '/src/components/Seo/Seo'
import * as css from '/src/styles/pages/search.module.scss'

const SearchPage = ({ data }) => {
  const posts = data.posts.edges
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const [searchResult, setSearchResult] = useState([])
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['node.frontmatter.title', 'node.excerpt']
    })
  }, [posts])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('query') || ''
    setSearchQuery(query)
  }, [setSearchQuery])

  useEffect(() => {
    setSearchResult(fuse.search(searchQuery))
  }, [searchQuery, fuse])

  return <MainLayout>
    <Seo
      title={`Search results for «${searchQuery}»`}
      description="Find the best results for your search query with our powerful search engine. Search through our vast database of articles, blog posts, and other resources to find exactly what you're looking for. Try it now!"
    />
    <div className={css.searchPage}>
      <div className={cn(css.container, 'container')}>
        {searchResult.length > 0
          ? <>
            <h1 className={css.title}>Search result for ”{searchQuery}”</h1>
            <p className={css.foundNumb}>{searchResult.length} articles found</p>
            <div className={cn('article-list-layout')}>
              {searchResult.map(({ item: { node } }) => {
                return <ArticleCard
                  key={`article-${node.fields.slug}`}
                  postNode={node}
                />
              })}
            </div>
          </> 
          : <>
            <div className={css.notFoundScreen}>
              <p>Nothing found</p>
              <p>Please, make sure your keywords are spelled correctly or try different search query</p>
            </div>
          </>
        }
      </div>
    </div>
  </MainLayout>
}

export default SearchPage

export const pageQuery = graphql`
  {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/^.*/content/blog/.*.md$/" } }
      sort: { frontmatter: { date: DESC } }
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
            author
            thumbnail {
              childImageSharp {
                fixed(width: 720) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            category_top_level
            category_second_level
          }
          excerpt(pruneLength: 220)
        }
      }
    }
  }
`
