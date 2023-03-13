import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import type { HeadFC } from 'gatsby'

import { Link, Icon } from '@ui'
import { Pen } from '@icons'
import { Seo, Banner } from '@components'

export const Head: HeadFC = () => <Seo title='Our Authors' />

type FetchAllAuthorsData = {
  allAuthors: {
    totalCount: number
    edges: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: Author
      }
    }[]
  }
}

const Authors = () => {
  const data: FetchAllAuthorsData = useStaticQuery(graphql`
    query FetchAllAuthors {
      allAuthors: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^.*/content/authors/.*.md$/" } }
      ) {
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              name
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    blurredOptions: { width: 100 }
                    placeholder: BLURRED
                    quality: 100
                    width: 166
                    height: 166
                    transformOptions: { cropFocus: CENTER }
                  )
                }
              }
              position
              description
            }
          }
        }
      }
    }
  `)

  const rawAuthors = data.allAuthors.edges.map((edge) => edge.node)
  const authors = rawAuthors.map((author) => ({
    ...author.frontmatter,
    slug: author.fields.slug,
  }))

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
                className='rounded-full down-lg:h-[100px] down-lg:w-[100px] phone:h-[80px] phone:w-[80px] flex-shrink-0'
              />
              <div className='flex flex-col body-1 phone:body-4'>
                <h3>{author.name}</h3>
                <span className='clr-secondary mt-2 mb-4'>
                  {author.position}
                </span>
                <span className='flex items-center clr-secondary'>
                  <Icon i={<Pen />} className='h-6 w-6 mr-2' />
                  Articles:
                  <span className='clr-gray-1 ml-1'>
                    {data.allAuthors.totalCount}
                  </span>
                </span>
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
