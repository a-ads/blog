import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { uniqueId } from 'lodash-es'
import { Card } from '@components'
import { Helmet } from 'react-helmet'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import Pagination from './ui/pagination'

type BlogPostGridProps = {
  posts: BlogPostCard[]
  amount?: number
  canLoadMore?: boolean
  span?: number[]
  className?: string
  header?: string
  blogPostGrid?: boolean
  isPagination?: boolean
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
  isPagination = true
}: BlogPostGridProps) => {
  const location = useLocation()
  const [currentBlogs, setCurrentBlogs] = useState<BlogPostCard[]>([])
  const [canonicalLink, setCanonicalLink] = useState(
    `${location.origin}${location.pathname}`
  )
  const searchParams = new URLSearchParams(location.search)
  const currentPage = parseInt(searchParams.get('page') as string) || 1

  useEffect(() => {
    const indexOfLastBlog = currentPage * amount
    const indexOfFirstBlog = indexOfLastBlog - amount

    if (posts.length <= amount) {
      setCurrentBlogs(posts)
    } else {
      setCurrentBlogs(posts.slice(indexOfFirstBlog, indexOfLastBlog))
    }
  }, [currentPage])

  const totalPages = Math.ceil(posts.length / amount)
  const maxDisplayPages = 5

  const pageNumbers = Array.from(
    { length: Math.ceil(posts.length / amount) },
    (_, index) => index + 1
  )

  const displayPageNumbers = (() => {
    if (totalPages <= maxDisplayPages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    } else {
      const middlePage = Math.floor(maxDisplayPages / 2)
      if (currentPage <= middlePage) {
        return Array.from(
          { length: maxDisplayPages - 1 },
          (_, index) => index + 1
        )
      } else if (currentPage >= totalPages - middlePage) {
        return Array.from(
          { length: maxDisplayPages - 1 },
          (_, index) => totalPages - maxDisplayPages + 2 + index
        )
      } else {
        return Array.from(
          { length: maxDisplayPages - 2 },
          (_, index) => currentPage - middlePage + index
        )
      }
    }
  })()

  const goToPage = (page: number) => {
    if (page === 1) {
      navigate(`${location.origin}${location.pathname}`, { replace: true })
    } else if (page >= 1 && page <= totalPages) {
      navigate(`${location.origin}${location.pathname}?page=${page}`)
    }
  }

  useEffect(() => {
    if (setBlogPostGrid) {
      setBlogPostGrid(true)
    }

    if (currentPage > 1) {
      setCanonicalLink(
        `${location.origin}${location.pathname}?page=${currentPage}`
      )
    } else {
      setCanonicalLink(`${location.origin}${location.pathname}`)
    }

    if (typeof window !== 'undefined') {
      const linkElement = document.querySelector('link[rel="canonical"]')
      if (linkElement) {
        linkElement.setAttribute('href', canonicalLink)
      }
    }
  }, [currentPage, canonicalLink])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [currentPage])

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
        {currentBlogs &&
          currentBlogs?.map((post, i) => (
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
      {isPagination && <Pagination
          goToPage={goToPage}
          displayPageNumbers={displayPageNumbers}
          canLoadMore={canLoadMore}
          pageNumbers={pageNumbers}
          currentPage={currentPage}
      />}
    </>
  )
}

export default BlogPostGrid
