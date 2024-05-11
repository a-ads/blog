import React, {useMemo, useState} from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { take, drop, sortBy, toInteger } from 'lodash-es'

import { BlogPostGrid, Banner, Seo } from '@components'
import '../global.scss'

export function Head({ pageContext: { title } }: any) {
  return (
    <Seo title={title}/>
  )
}


const IndexPage = ({pageContext}: any) => {
  const {post, title} = pageContext
  const [blogPostGrid, setBlogPostGrid] = useState(false)

  const { top, popular, rest } = useMemo(() => {
    return {
      top: take(post, post.length - 1),
      popular: take(
        sortBy(post, (post) => toInteger(post.popularity)).reverse(),
        5
      ),
      rest: drop(post, 5),
    }
  }, [post])

  return (
    <>
      <section aria-label='Crypto Marketing & Trends' className='relative'>
        <h1 className='container large mb-10 mt-12 tablet:mt-8 phone:my-5'>
          A-ADS Crypto Blog
        </h1>
         {/* @ts-ignore */}
        <BlogPostGrid posts={top} amount={5} isPagination={false}/>

        {/* Background images  */}
        <StaticImage
          src='../../static/images/backgrounds/left.png'
          alt='Background image'
          className='!absolute top-0 left-0 -z-10'
          quality={100}
          placeholder='none'
        />
        <StaticImage
          src='../../static/images/backgrounds/right.png'
          alt='Background image'
          className='!absolute bottom-0 right-0 -z-10'
          quality={100}
          placeholder='none'
        />
      </section>

      <Banner />

      <BlogPostGrid
        /*@ts-ignore*/
        posts={rest}
        header={title}
        blogPostGrid={blogPostGrid}
        setBlogPostGrid={setBlogPostGrid}
        canLoadMore className='mt-20'
      />

      <section aria-label='Most popular' className='py-20'>
        <div className='container'>
          <h2 className='h1 mb-10'>Most popular</h2>
          <BlogPostGrid posts={popular} />
        </div>
      </section>

      <Banner variant='promote' />
    </>
  )
}

export default IndexPage
