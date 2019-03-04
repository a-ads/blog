import React from 'react'
import _ from 'lodash'
import Slider from 'react-slick'
import { withPrefix } from 'gatsby'
import Layout from '../layouts/index'
import Card from '../components/card'
import SocialButtonsDesktop from '../components/social-buttons-desktop'
import SocialButtonsMobile from '../components/social-buttons-mobile'
import Helmet from 'react-helmet'

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { location } = this.props
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const post = this.props.data.markdownRemark
    const HTMLTitle = `${post.frontmatter.title} — ${this.props.data.site.siteMetadata.title}`

    return (
      <Layout>
        <Helmet>
          <title>{HTMLTitle}</title>
          <meta property='og:url' content={`${siteUrl}${location.pathname}`} />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={post.frontmatter.title} />
          <meta property='og:image' content={`${siteUrl}${post.frontmatter.thumbnail}`} />
          <meta property='og:site_name' content={this.props.data.site.siteMetadata.title} />
          <meta property='og:locale' content="en_US" />
          <meta property='og:description' content={post.excerpt} />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@aads_network' />
          <meta name='twitter:url' content={`${siteUrl}${location.pathname}`} />
          <meta name='twitter:title' content={post.frontmatter.title} />
          <meta name='twitter:description' content={post.excerpt} />
          <meta name='twitter:image' content={`${siteUrl}${post.frontmatter.thumbnail}`} />
        </Helmet>
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
                <img src={post.frontmatter.thumbnail} alt='pic' />
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
      tagsArray.push(<a className='c-tag' key={index} href={withPrefix(`/tags/${_.kebabCase(tag)}`)}>{tag}</a>)
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
      excerpt
    }

    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
