import React, {useMemo, useState} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { take, drop, sortBy, toInteger } from 'lodash-es'

import { BlogPostGrid, Banner, Seo } from '@components'
import '../global.scss'

export function Head({pageContext} : any) {
  console.log(pageContext, 'pageContext');
  return <Seo />
}

interface IBlogPosts {
  allMarkdownRemark: {
    nodes: {
      frontmatter: BlogPost
    }[]
  }
}

const IndexPage = (props: any) => {
  console.log(props, 'props');
  return (
    <>
      <section aria-label='Crypto Marketing & Trends' className='relative'>
        <h1 className='container large mb-10 mt-12 tablet:mt-8 phone:my-5'>
          A-ADS Crypto Blog
        </h1>

        <BlogPostGrid posts={[]} amount={5} isPagination={false}/>

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

      <BlogPostGrid posts={[]} canLoadMore className='mt-20' />

      <section aria-label='Most popular' className='py-20'>
        <div className='container'>
          <h2 className='h1 mb-10'>Most popular</h2>
          <BlogPostGrid posts={[]} />
        </div>
      </section>

      <Banner variant='promote' />
    </>
  )
}

export default IndexPage
