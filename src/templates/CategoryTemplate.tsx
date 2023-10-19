import React, { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { take, drop } from 'lodash-es'

import { Link } from '@ui'
import { Banner, BlogPostGrid, Seo } from '@components'
import { toCategoryLink } from '@utils'

interface CategoryPageProps {
  pageContext: {
    category: CategoriesTopLevelNames
    subcategories: CategoriesSecondLevelNames[]
    posts: BlogPostCard[]
    meta_description: string
    categoryObj: {
      h1: string
      html_title: string
      meta_description: string
    }
  }
}

export function Head({ pageContext: { categoryObj } }: any) {
  return (
    <Seo
      title={categoryObj.html_title}
      description={categoryObj.meta_description}
    />
  )
}

const CategoryTemplate = (props: CategoryPageProps) => {
  const { category, subcategories, posts, categoryObj } = props.pageContext
  const [blogPostGrid, setBlogPostGrid] = useState(false)

  return (
    <>
      <div className='pb-5 relative'>
        <section aria-label={category} className='container'>
          <h1 className='up-desktop:mt-12 mt-8 phone:mt-6 mb-3'>
            {categoryObj.h1}
          </h1>

          <div className='flex gap-8 mb-7 up-desktop:mb-10 phone:mb-6 scroll-section'>
            {category === 'Guides' &&
              subcategories.map((subcat, index) => {
                return (
                  <Link
                    key={index}
                    text={subcat}
                    to={toCategoryLink(category, subcat)}
                    baseCn='flex-center px-8 py-4 max-w-50 clr-black rounded whitespace-nowrap bg-gradient'
                    // On active:
                    className='hover-btn aria-[current="page"]:!bg-[#03a9f41a] aria-[current="page"]:!clr-blue aria-[current="page"]:font-extrabold'
                  />
                )
              })}
          </div>
        </section>
        <BlogPostGrid
          posts={[...take(posts, 5), ...drop(posts, 5)]}
          header={categoryObj.h1}
          blogPostGrid={blogPostGrid}
          setBlogPostGrid={setBlogPostGrid}
          canLoadMore
          className='mt-20 mb-20'
        />
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

export default CategoryTemplate
