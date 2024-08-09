import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import cn from 'classnames'

import MainLayout from '/src/layouts/MainLayout'
import * as css from '/src/styles/templates/blog-post.module.scss'
import toKebabCase from '../utils/to-kebab-case'

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
            <Link to="/">Blog</Link>
            <span className={css.dot} />
            <Link to={`/${toKebabCase(post.frontmatter.category_top_level[0])}`}>
              {post.frontmatter.category_top_level[0]}
            </Link>
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

            <div className={css.tableOfContents}>
              <div className={css.tocContainer}>
                <p className={css.tocTitle}>
                  Read in this article
                </p>
              </div>

              <div
                className={css.tocContainer}
                dangerouslySetInnerHTML={{__html: post.tableOfContents}}
              />

              <div className={css.share}>
                <div className={css.tocContainer}>
                  <p>Share this article</p>
                  <div>
                    <a>
                      <img 
                        src="/images/link-share.svg"
                        width={25}
                        height={25}
                        alt="link-share"
                      />
                    </a>
                    <a>
                      <img 
                        src="/images/twitter-share.svg"
                        width={25}
                        height={25}
                        alt="twitter-share"
                      />
                    </a>
                    <a>
                      <img 
                        src="/images/linkedin-share.svg"
                        width={25}
                        height={25}
                        alt="linkedin-share"
                      />
                    </a>
                    <a>
                      <img 
                        src="/images/fb-share.svg"
                        width={25}
                        height={25}
                        alt="fb-share"
                      />
                    </a>
                  </div>
                </div>
              </div>
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
      frontmatter {
        title
        date
        category_top_level
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
      tableOfContents
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
