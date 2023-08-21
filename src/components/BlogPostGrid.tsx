import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { uniqueId } from 'lodash-es'
import { Card } from '@components'
import Pagination from './ui/pagination'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'

type BlogPostGridProps = {
  posts: BlogPostCard[]
  amount?: number
  canLoadMore?: boolean
  span?: number[] // Indexes of posts to span across the grid
  className?: string
  header?: string
  blogPostGrid?: boolean
  setBlogPostGrid?: (blogPostGrid: boolean) => void
}

const BlogPostGrid = ({
  posts = [],
  amount = 20,
  canLoadMore,
  span = [0],
  className,
  header,
  blogPostGrid,
  setBlogPostGrid,
}: BlogPostGridProps) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialPage = parseInt(queryParams.get('page') || '1', 10)

  const [currentPage, setCurrentPage] = useState(initialPage - 1)
  const [canonicalLink, setCanonicalLink] = useState('')
  const [currentPageItems, setCurrentPageItems] = useState(() => {
    const currentPageParam = queryParams.get('page') || '1'

    const currentPage = currentPageParam
      ? parseInt(currentPageParam, 10) - 1
      : 0
    const offset = currentPage * amount
    return posts.slice(offset, offset + amount)
  })

  if (posts.length <= 0) {
    return null
  }

  const pageCount = Math.ceil(posts.length / amount)

  useEffect(() => {
    const currentPageParam = queryParams.get('page')
    const currentPage = currentPageParam
      ? parseInt(currentPageParam, 10) - 1
      : 0
    const offset = currentPage * amount
    setCurrentPageItems(posts.slice(offset, offset + amount))
  }, [])

  const handlePageChange = (selectedPage: { selected: number }) => {
    const newPage = selectedPage.selected + 1

    if (newPage > 1) {
      queryParams.set('page', String(newPage))
      if (typeof window !== 'undefined') {
        const updatedUrl = `${location.pathname}?${queryParams.toString()}`
        window.history.pushState(null, '', updatedUrl)
      }

      const updatedCanonicalLink = `${location.origin}${location.pathname}?page=${newPage}`
      setCanonicalLink(updatedCanonicalLink)
    } else {
      queryParams.delete('page')
      if (typeof window !== 'undefined') {
        const updatedUrl = `${location.pathname}${
          queryParams.toString() ? '?' + queryParams.toString() : ''
        }`
        window.history.pushState(null, '', updatedUrl)
      }

      const updatedCanonicalLink = `${location.origin}${location.pathname}`
      setCanonicalLink(updatedCanonicalLink)
    }

    const offset = selectedPage.selected * amount

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }

    setCurrentPageItems(posts.slice(offset, offset + amount))

    setCurrentPage(newPage)
  }

  useEffect(() => {
    if (setBlogPostGrid) {
      setBlogPostGrid(true)

      if (typeof window !== 'undefined') {
        const linkElement = document.querySelector('link[rel="canonical"]')
        if (linkElement) {
          linkElement.setAttribute('href', canonicalLink)
        }
      }
    }
  }, [currentPage])

  const hrefBuilder = (currentPage: number) => {
    if (currentPage === 1) {
      return `${location.origin}${location.pathname}`
    } else {
      return `${location.origin}${location.pathname}?page=${currentPage}`
    }
  }

  return (
    <>
      <Helmet>
        {blogPostGrid && <title>{`${header} - page ${currentPage}`}</title>}
      </Helmet>
      <div
        className={cn(
          'container grid up-lg:grid-cols-3 gap-8 grid-cols-2 down-tablet:grid-cols-1',
          className
        )}
      >
        {currentPageItems &&
          currentPageItems?.map((post, i) => (
            <Card
              key={uniqueId()}
              className={cn('mb-8 phone:mb-0 hover-card', {
                'col-span-2 down-tablet:col-span-1 down-tablet:w-full':
                  span.includes(i),
              })}
              {...post}
            />
          ))}
      </div>
      {canLoadMore && (
        <Pagination
          onPageChange={handlePageChange}
          pageCount={pageCount}
          initialPage={initialPage - 1}
          hrefBuilder={hrefBuilder}
          currentPage={currentPage}
        />
      )}
    </>
  )
}

export default BlogPostGrid
