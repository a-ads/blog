import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { Link, Icon } from '@ui'
import { Pen } from '@icons'
import { Seo, Banner } from '@components'

interface AuthorsPageProps {
  pageContext: {
    authors: Omit<Author, 'posts'>[]
  }
}

export function Head() {
  return (
    <Seo
      title='AADS Authors'
      description='Read the articles by our authors.'
    />
  )
}

const Authors: React.FC<AuthorsPageProps> = ({ pageContext: { authors } }) => {
  return (
    <>
      <section className='container mb-24 phone:mb-10' aria-label='Authors'>
        <h1 className='mt-8 phone:mt-8 mb-12 phone:mb-5'>Authors</h1>
        <div className='grid grid-cols-2 gap-x-8 down-tablet:grid-cols-1'>
          {authors.map((author) => (
            <Link
              key={author.slug}
              to={author.slug}
              className='flex items-center justify-start gap-6 mb-10 down-tablet:w-full p-0'
            >
              <GatsbyImage
                image={getImage(author.thumbnail)!}
                alt={author.name}
                className='max-w-[166px] max-h-[166px] rounded-full down-lg:h-[100px] down-lg:w-[100px] phone:h-[80px] phone:w-[80px] flex-shrink-0'
              />
              <div className='flex flex-col body-1 phone:body-4'>
                <h3>{author.name}</h3>
                <span className='clr-secondary mt-2 mb-4'>
                  {author.position}
                </span>
                {author.postCount && (
                  <span className='flex items-center clr-secondary'>
                    <Icon i={<Pen />} className='h-6 w-6 mr-2' />
                    Articles:
                    <span className='clr-gray-1 ml-1'>{author.postCount}</span>
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Banner variant='promote' />
    </>
  )
}

export default Authors
