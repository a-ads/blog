import React from 'react'
import _ from 'lodash'

import AadsServices from '../components/aads-services'
import SocialButtonsDesktop from '../components/social-buttons-desktop';
import SocialButtonsMobile from '../components/social-buttons-mobile';

const createTags = (tags) => {
  const tagsArray = []

  tags.forEach((tag) => {
    tagsArray.push(<a className='c-tag' href={`/tags/${_.kebabCase(tag)}`}>{tag}</a>)
  })

  return (
    <div className='c-blog-post__tags__container'>
      {tagsArray}
    </div>
  )
}

export default ({ data, pathContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pathContext

  return (
    <div className='l-container'>
      <div className='c-blog-post'>
        <article>
          <section className='c-blog-post__header'>
            <h1 className='c-blog-post__title'>
              {post.frontmatter.title}
            </h1>
            <div className='c-blog-post__category'>
              <span>{post.frontmatter.category}</span>
            </div>
          </section>

          {post.frontmatter.thumbnail &&
            <section className='c-blog-post__big-picture'>
              <img src={post.frontmatter.thumbnail} alt='pic'/>
            </section>
          }

          <section className='c-blog-post__body'>
            <div className='c-blog-post__body__container l-container'  
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </section>        
          <SocialButtonsMobile />
          <SocialButtonsDesktop />
          {post.frontmatter.tags && 
            <section className='c-blog-post__tags'>
              {createTags(post.frontmatter.tags)}
            </section>
          }
        </article>

        <div className='c-blog-post__related-articles'>
          <div className='l-container'>
            <div className='c-blog-post__related-articles-title h2-like'>
              Also read related articles
            </div>
          </div>
          <div className='c-blog-post__related-articles-container l-container'>
            {previous &&
              <div className='c-card'>
                <a href={previous.fields.slug}>
                  <div className='c-card__image'>
                    {previous.frontmatter.thumbnail &&
                      <img src={previous.frontmatter.thumbnail} alt=''/>
                    }
                  </div>
                  <div className='c-card__text'>
                    <div className='c-card__text__category'>{previous.frontmatter.category}</div>
                    <div className='c-card__text__title'>
                      {previous.frontmatter.title}
                    </div>
                  </div>
                </a>
              </div>
            }
            {next &&
              <div className='c-card'>
                <a href={next.fields.slug}>
                  <div className='c-card__image'>
                    {next.frontmatter.thumbnail &&
                      <img src={next.frontmatter.thumbnail} alt=''/>
                    }
                  </div>
                  <div className='c-card__text'>
                    <div className='c-card__text__category'>{next.frontmatter.category}</div>
                    <div className='c-card__text__title'>
                      {next.frontmatter.title}
                    </div>
                  </div>
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        thumbnail
        tags
        category
      }
    }
  }
`
