import React from 'react'

import AadsServices from '../components/aads-services'
import SocialButtonsDesktop from '../components/social-buttons-desktop';
import SocialButtonsMobile from '../components/social-buttons-mobile';

const createTags = (tags) => {
  const tagsArray = []

  tags.forEach((tag) => {
    tagsArray.push(<a className='c-tag' href='#'>{tag}</a>)
  })

  return (
    <div className='c-blog-article__tags__container l-container'>
      {tagsArray}
    </div>
  )
}

export default ({ data, pathContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pathContext

  return (
    <div>
      <article className='c-blog-article'>
        <section className='c-blog-article__header'>
          <div className='l-container'>
            <div className='c-blog-article__category'>
              <span>{post.frontmatter.category}</span>
            </div>
            <h1 className='c-blog-article__title'>
              {post.frontmatter.title}
            </h1>
          </div>
        </section>

        {post.frontmatter.thumbnail &&
          <section className='c-blog-article__big-picture'>
            <img src={post.frontmatter.thumbnail} alt='pic'/>
          </section>
        }

        <section className='c-blog-article__body'>
          <div className='c-blog-article__body__container l-container'  
              dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>

        <SocialButtonsDesktop />

        <SocialButtonsMobile />

        {post.frontmatter.tags && 
          <section className='c-blog-article__tags'>
            {createTags(post.frontmatter.tags)}
          </section>
        }

        <section className='c-blog-article__nearby-articles'>
          <div className='c-blog-article__nearby-articles__container l-container'>
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
        </section>
      </article>

      <AadsServices />
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
