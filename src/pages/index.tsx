import React, { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { take, drop } from 'lodash-es'

import { BlogPostGrid, Banner, Seo } from '@components'
import '../global.css'

interface IBlogPosts {
  allMarkdownRemark: {
    nodes: {
      frontmatter: BlogPost
    }[]
  }
}

const IndexPage = () => {
  const data: IBlogPosts = useStaticQuery(graphql`
    query FetchBlogPostsByPopularity {
      allMarkdownRemark(
        filter: {}
        sort: { frontmatter: { popularity: DESC } }
      ) {
        nodes {
          frontmatter {
            category_top_level
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  blurredOptions: { width: 100 }
                  placeholder: BLURRED
                  quality: 100
                  layout: FULL_WIDTH
                  transformOptions: { cropFocus: CENTER }
                  aspectRatio: 1.7
                )
              }
            }
            title
            reading_time
            slug
          }
        }
      }
    }
  `)

  const posts = useMemo(() => {
    const posts = data.allMarkdownRemark.nodes
      // Remove frontmatter key
      .map((node) => node.frontmatter)
      // Remove posts without title - how the hell did they get there? todo
      .filter((post) => post.title)
    // Grab first 5 most popular posts and the rest
    return {
      top: take(posts, 5),
      rest: drop(posts, 5),
    }
  }, [])

  return (
    <>
      <Seo />
      <section
        aria-label='Crypto Marketing & Trends'
        className='relative mb-20'
      >
        <h1 className='container large mb-10 mt-12 tablet:mt-8 phone:my-5'>
          Crypto Marketing & Trends
        </h1>

        <BlogPostGrid posts={posts.top} />

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

      <BlogPostGrid posts={posts.rest} canLoadMore className='mt-20' />

      <section aria-label='Most popular' className='py-20'>
        <div className='container'>
          <h2 className='h1 mb-10'>Most popular</h2>
          <BlogPostGrid posts={posts.top} />
        </div>
      </section>

      <Banner variant='promote' />
    </>
  )
}

export default IndexPage
