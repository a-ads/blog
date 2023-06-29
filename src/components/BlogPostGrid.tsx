import React, { useState } from 'react'
import cn from 'classnames'
import { uniqueId } from 'lodash-es'

import { Button } from '@ui'
import { Card } from '@components'

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
  ...props
}: BlogPostGridProps) => {
  const [postAmountToDisplay, setPostAmountToDisplay] = useState(amount)

  if (posts.length <= 0) {
    return null
  }

  const hasDisplayedAllPosts = postAmountToDisplay >= posts.length

  return (
    <>
      <div
        className={cn(
          'container grid up-lg:grid-cols-3 gap-8 grid-cols-2 down-tablet:grid-cols-1',
          className
        )}
        {...props}
      >
        {posts.map(
          (post, i) =>
            i < postAmountToDisplay && (
              <Card
                key={uniqueId()}
                className={cn('mb-8 phone:mb-0', {
                  'col-span-2 down-tablet:col-span-1 down-tablet:w-full':
                    span.includes(i),
                })}
                {...post}
              />
            )
        )}
      </div>
      {canLoadMore && !hasDisplayedAllPosts && (
        <Button
          primary
          text='Load more'
          onClick={() => setPostAmountToDisplay((prev) => prev + 5)}
          className='btn-load body-1 !font-semibold phone:body-4 phone:h-11 w-screen h-20 mt-9 tablet:mt-12 phone:mt-8'
        />
      )}
    </>
  )
}

export default BlogPostGrid
