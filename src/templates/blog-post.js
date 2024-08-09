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
  const post = data.markdownRemark
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
          <h1 className={css.title}>{post.frontmatter.title}</h1>
          <p className={css.date}>Updated: {post.frontmatter.date}</p>
          <div className={css.articlePicture}>
            <Img
              fluid={post.frontmatter.thumbnail?.childImageSharp.fluid}
            />
          </div>
          <article className={css.article} 
            dangerouslySetInnerHTML={{__html: post.html}}
          />
        </div>

        <div className={css.sidebar}>
          <div className={css.stickyWrap}>
            <div className={css.author}>
              <div className={css.pic}>
                <Img
                  fixed={author.frontmatter.thumbnail?.childImageSharp.fixed}
                />
              </div>
              <p className={css.name}>{author.frontmatter.name}</p>
              <p className={css.position}>{author.frontmatter.position}</p>
            </div>
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
        date
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
