import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { drop } from 'lodash-es'

import { Banner, BlogPostGrid, Breadcrumbs, Seo } from '@components'
import { Icon } from '@ui'
import { Pen } from '@icons'
interface AuthorPageProps {
  pageContext: Author
}

export function Head({ pageContext: { name, description, json_ld } }) {
  return (
    <Seo title={name} description={`${description}`}>
      {json_ld && <script type='application/ld+json'>{json_ld}</script>}
    </Seo>
  )
}

const AuthorPage: React.FC<AuthorPageProps> = ({ pageContext }) => {
  const { name, position, description, thumbnail, postCount, posts, html } =
    pageContext

  return (
    <>
      <div className='container'>
        <Breadcrumbs
          tags={['authors']}
          className='mb-10 up-desktop:mt-12 mt-8 phone:mt-5'
          omitCategoriesRoutePrefix
        />
        <div className='flex gap-x-8 gap-y-6 down-tablet:flex-wrap'>
          <GatsbyImage
            image={getImage(thumbnail)!}
            alt={name}
            className='flex-shrink-0 rounded-full author-img'
          />
          <div className='flex flex-col w-3/4 up-md:pl-8'>
            <h1 className='h1'>{name}</h1>
            <p className='body-1 !font-semibold font-secondary mt-2 mb-5 clr-secondary'>
              {position}
            </p>
            <span>{description}</span>
            <div
              className='author-description'
              // @ts-ignore
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <footer className='flex-between mt-5'>
              <div className='flex-center gap-2 clr-secondary body-3'>
                <Icon i={<Pen />} className='h-6 w-6' />
                Articles: <span className='clr-primary'>{postCount}</span>
              </div>
              {/* <div className='flex-center gap-17'>{medias}</div> */}
            </footer>
          </div>
        </div>
      </div>

      <section
        aria-label={`${name}'s latest articles`}
        className='container mb-14'
      >
        <h2 className='mt-11 name-latest'>{name}'s latest articles</h2>
        <BlogPostGrid posts={posts!} className='mt-8' />
      </section>
      <BlogPostGrid posts={drop(posts!, 5)} className='container' canLoadMore />
      <div className='mb-20 tablet:mb-15 phone:mb-10' />
      <Banner variant='promote' />
    </>
  )
}

export default AuthorPage
