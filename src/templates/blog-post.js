import React from 'react'
import _ from 'lodash'
import Slider from 'react-slick'

import Layout from '../layouts/index'
import Card from '../components/card'
import SocialButtonsDesktop from '../components/social-buttons-desktop'
import SocialButtonsMobile from '../components/social-buttons-mobile'

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const post = this.props.data.markdownRemark
    
    return (
      <Layout>
        <div className='c-blog-post'>
          <article className='l-blog-post-container'>
            <section className='c-blog-post__header'>
              <h1 className='c-blog-post__title'>
                {post.frontmatter.title}
              </h1>
              <div className='c-blog-post__category'>
                {post.frontmatter.category}
              </div>
            </section>

            {post.frontmatter.thumbnail &&
              <section className='c-blog-post__big-picture'>
                <img src={post.frontmatter.thumbnail} alt='pic'/>
              </section>
            }

            <section className='c-blog-post__body'>
              <div className='c-blog-post__body__container'  
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </section>        
            {post.frontmatter.tags && 
              <section className='c-blog-post__tags'>
                {this.renderTags(post.frontmatter.tags)}
              </section>
            }
            <SocialButtonsDesktop />
            <SocialButtonsMobile />
          </article>
          
          {this.renderRelatedPostsSlider()}
        </div>
      </Layout>
    )
  }

  renderTags(tags) {
    const tagsArray = []

    tags.forEach((tag, index) => {
      tagsArray.push(<a className='c-tag' key={index} href={`/tags/${_.kebabCase(tag)}`}>{tag}</a>)
    })

    return (
      <div className='c-blog-post__tags__container'>
        {tagsArray}
      </div>
    )
  }

  renderRelatedPostsSlider() {
    const relatedPosts = this.props.pathContext.relatedPosts;
    if (relatedPosts.length === 0) {
      return
    }

    return (
      <div className='c-blog-post__related-articles'>
        <div className='l-blog-post-container'>
          <div className='c-blog-post__related-articles-title h2-like'>
            Also read related articles
          </div>
          
          <div className='c-blog-post__related-articles-container'>
            <Slider
              slidesToShow={2}
              slidesToScroll={2}
              dots={true}
              infinite={false}
              variableWidth={true}
              responsive={[
                {
                  breakpoint: 1240,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                  }
                }
              ]}
            >
              {this.props.pathContext.relatedPosts.map((post, index) => (
                <Card
                  key={index}
                  link={post.node.fields.slug}
                  thumbnail={post.node.frontmatter.thumbnail}
                  title={post.node.frontmatter.title}
                  category={post.node.frontmatter.category}
                  date={post.node.frontmatter.date}
                  excerpt={post.node.excerpt}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
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
