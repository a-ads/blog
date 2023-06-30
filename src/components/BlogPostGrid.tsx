import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { uniqueId } from 'lodash-es'
import { Card } from '@components'
import Pagination from './ui/pagination'

type BlogPostGridProps = {
  posts: BlogPostCard[]
  amount?: number
  canLoadMore?: boolean
  span?: number[] // Indexes of posts to span across the grid
  className?: string
}

const BlogPostGrid = ({
  posts = [],
  amount = 5,
  canLoadMore,
  span = [0],
  className,
}: BlogPostGridProps) => {
  const [canonicalLink, setCanonicalLink] = useState('')
  const [currentPageItems, setCurrentPageItems] = useState(() => {
    const currentPageParam = new URLSearchParams(window.location.search).get(
      'page'
    )
    const currentPage = currentPageParam
      ? parseInt(currentPageParam, 10) - 1
      : 0
    const offset = currentPage * amount
    return posts.slice(offset, offset + amount)
  })

  const pageCount = Math.ceil(posts.length / amount)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const currentPageParam = queryParams.get('page')
    const currentPage = currentPageParam
      ? parseInt(currentPageParam, 10) - 1
      : 0
    const offset = currentPage * amount
    setCurrentPageItems(posts.slice(offset, offset + amount))
  }, [])

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPageItems(() => {
      const offset = selectedPage.selected * amount
      return posts.slice(offset, offset + amount)
    })

    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('page', String(selectedPage.selected + 1))

    const updatedUrl = `${window.location.pathname}?${queryParams.toString()}`
    window.history.pushState(null, '', updatedUrl)

    const updatedCanonicalLink = `${window.location.origin}${
      window.location.pathname
    }?page=${selectedPage.selected + 1}`
    setCanonicalLink(updatedCanonicalLink)
  }

  useEffect(() => {
    const linkElement = document.querySelector('link[rel="canonical"]')
    if (linkElement) {
      linkElement.setAttribute('href', canonicalLink)
    }
  }, [canonicalLink])

  if (posts.length <= 0) {
    return null
  }

  return (
    <>
      <div
        className={cn(
          'container grid up-lg:grid-cols-3 gap-8 grid-cols-2 down-tablet:grid-cols-1',
          className
        )}
      >
        {currentPageItems.map((post, i) => (
          <Card
            key={uniqueId()}
            className={cn('mb-8 phone:mb-0', {
              'col-span-2 down-tablet:col-span-1 down-tablet:w-full':
                span.includes(i),
            })}
            {...post}
          />
        ))}
      </div>
      {canLoadMore && (
        <Pagination onPageChange={handlePageChange} pageCount={pageCount} />
      )}
    </>
  )
}

export default BlogPostGrid
