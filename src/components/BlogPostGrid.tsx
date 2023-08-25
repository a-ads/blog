import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { uniqueId } from 'lodash-es'
import { Card } from '@components'
import { Helmet } from 'react-helmet'
import '../components/ui/pagination/pagination.css'
import { Link, navigate } from 'gatsby'
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
  const [canonicalLink, setCanonicalLink] = useState(
    `${location.origin}${location.pathname}`
  )
  const searchParams = new URLSearchParams(location.search)
  const currentPage = parseInt(searchParams.get('page') as string) || 1

  const indexOfLastBlog = currentPage * amount
  const indexOfFirstBlog = indexOfLastBlog - amount
  const currentBlogs = posts.slice(indexOfFirstBlog, indexOfLastBlog)

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
    }
  }, [currentPage, canonicalLink])

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
      {displayPageNumbers.length > 1 && (
        <ul className='pagination'>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          {canLoadMore &&
            displayPageNumbers.map((number) => {
              return (
                <li className={currentPage === number ? 'active' : ''}>
                  <Link
                    to={
                      number === 1
                        ? `${location.origin}${location.pathname}`
                        : `${location.origin}${location.pathname}?page=${number}`
                    }
                    key={number}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </Link>
                </li>
              )
            })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            {'>'}
          </button>
        </ul>
      )}
    </>
  )
}

export default BlogPostGrid
