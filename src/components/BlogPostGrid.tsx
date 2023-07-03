import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { uniqueId } from 'lodash-es'
import { Card } from '@components'
import Pagination from './ui/pagination'
import { navigate, useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

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
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialPage = parseInt(queryParams.get('page') || '1', 10)
  const [currentPage, setCurrentPage] = useState(initialPage - 1)
  const [title, setTitle] = useState('')

  const pageCount = Math.ceil(posts.length / amount)

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
    navigate(`?page=${selected + 1}`)
  }

  const offset = currentPage * amount
  const currentItems = posts.slice(offset, offset + amount)

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `)

  const pageTitle = data.site.siteMetadata.title
  const pathSegments = 'blog/categories/how-to'
  const canonicalUrl = `${
    data.site.siteMetadata.siteUrl
  }/${pathSegments}/page/${currentPage + 1}`

  useEffect(() => {
    setTitle(`Page ${currentPage + 1}`)
  }, [currentPage, pageTitle, title])

  if (posts.length <= 0) {
    return null
  }

  return (
    <>
      <Helmet>
        <title data-gatsby-head='true'>{pageTitle + ' ' + title}</title>
        <title>{pageTitle + ' ' + title}</title>
        <link rel='canonical' href={canonicalUrl} />
      </Helmet>
      <div
        className={cn(
          'container grid up-lg:grid-cols-3 gap-8 grid-cols-2 down-tablet:grid-cols-1',
          className
        )}
      >
        {currentItems.map((post, i) => (
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
        <Pagination
          initialPage={initialPage - 1}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      )}
    </>
  )
}

export default BlogPostGrid
