import React from 'react'

import AadsServices from '../components/aads-services'

export default ({ data, pathContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pathContext

  console.log(post)

  return (
    <div>
      <article className='c-blog-article'>
        <section className='c-blog-article__header'>
          <div className='l-container'>
            <div className='c-blog-article__category'>
              <span>Customer Support</span>
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
        <section className='c-blog-article__tags'>
          <div className='c-blog-article__tags__container l-container'><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a></div>
        </section>
        <section className='c-blog-article__nearby-articles'>
          <div className='c-blog-article__nearby-articles__container l-container'>
            {previous &&
              <div className='c-card c-card--prev-article'>
                <a href={previous.fields.slug}>
                  <div className='c-card__image'>
                    {previous.frontmatter.thumbnail &&
                      <img src={previous.frontmatter.thumbnail} alt=''/>
                    }
                  </div>
                  <div className='c-card__text'>
                    <div className='c-card__text__category'>Customer Support</div>
                    <div className='c-card__text__title'>
                      {previous.frontmatter.title}
                    </div>
                  </div>
                </a>
              </div>
            }
            {next &&
              <div className='c-card c-card--next-article'>
                <a href={next.fields.slug}>
                  <div className='c-card__image'>
                    {next.frontmatter.thumbnail &&
                      <img src={next.frontmatter.thumbnail} alt=''/>
                    }
                  </div>
                  <div className='c-card__text'>
                    <div className='c-card__text__category'>Customer Support</div>
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
      }
    }
  }
`
