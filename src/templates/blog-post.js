import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import cn from 'classnames'

import MainLayout from '/src/layouts/MainLayout'
import * as css from '/src/styles/templates/blog-post.module.scss'

const BlogPost = ({
  data,
  pageContext
}) => {
  const { html } = data.markdownRemark
  const { author } = data

  return <MainLayout>
    <div className={css.blogPost}>
      <div className={cn(css.container, 'container')}>
        <div className={css.main}>
          <div className={cn(css.categories, 'breadcrumbs')}>
            <a>Blog</a>
            <span className={css.dot} />
            <a>Publishers</a>
          </div>

          <article className={css.article} 
            dangerouslySetInnerHTML={{__html: html}}
          />
        </div>

        <div className={css.sidebar}>
          <div className={css.author}>
            <div>
              <Img
                fixed={author.frontmatter.thumbnail.childImageSharp.fixed}
              />
            </div>
            <p>{author.frontmatter.name}</p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
}

export const pageQuery = graphql`
  query($slug: String!, $authorName: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    author: markdownRemark(frontmatter: { name: { eq: $authorName } }) {
      frontmatter {
        name
        position
        thumbnail {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

export default BlogPost
