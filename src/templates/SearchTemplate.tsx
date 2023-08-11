import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Fuse from 'fuse.js'
import type { PageProps } from 'gatsby'

import { BlogPostGridLoadMore, Banner, Seo } from '@components'
import { useSearchQuery } from '../components/Search'

interface SearchPageProps {
  pageContext: {
    posts: BlogPostCard[]
  }
  location: PageProps['location']
}

const SearchPage: React.FC<SearchPageProps> = ({
  pageContext: { posts },
  location,
}) => {
  let { searchQuery } = useSearchQuery()
  searchQuery ||= location.search as string

  const fuse = new Fuse(posts, {
    keys: ['title', 'author', 'excerpt', 'tags'],
  })

  const results = fuse.search(searchQuery)

  return (
    <>
      <Seo
        title={`Search results for «${searchQuery}»`}
        description="Find the best results for your search query with our powerful search engine. Search through our vast database of articles, blog posts, and other resources to find exactly what you're looking for. Try it now!"
      />
      <div className='relative'>
        {results.length ? (
          <div className='container pt-8 up-desktop:pt-12 phone:pt-7 pb-10 min-h-screen'>
            <h1>Search results for «{searchQuery}»</h1>
            <small className='clr-secondary'>
              {results.length} article{results.length === 1 ? '' : 's'} found
            </small>
            <BlogPostGridLoadMore
              posts={results.map((result) => ({
                ...(result as { item: BlogPostCard }).item,
                key: result.refIndex,
              }))}
              span={[]}
              amount={Infinity}
              className='mt-10'
            />
          </div>
        ) : (
          <div className='container pt-8 up-desktop:pt-12 phone:pt-7 pb-10 min-h-screen'>
            <h1>No results were found</h1>
            <small>
              Please, make sure your keywords are spelled correctly or try
              different search query
            </small>
          </div>
        )}
        <Banner variant='promote' />

        {/* Background image  */}
        <StaticImage
          src='../../static/images/backgrounds/left.png'
          alt='Background image'
          className='!absolute top-0 left-0 -z-10'
          quality={100}
          placeholder='none'
        />
      </div>
    </>
  )
}

export default SearchPage
