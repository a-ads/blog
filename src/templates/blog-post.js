import React, { useEffect, useState } from 'react'
import { graphql, withPrefix } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import cn from 'classnames'
import { useLocation } from '@reach/router'
import 'prismjs/themes/prism.css'

import MainLayout from '/src/layouts/MainLayout'
import getCategoryPath from '/src/utils/get-category-path'
import Seo from '/src/components/Seo/Seo'
import * as css from '/src/styles/templates/blog-post.module.scss'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  const formatter = new Intl.DateTimeFormat('en-GB', options)
  return formatter.format(date)
}

const extractFilename = (filePath) => {
  if (typeof filePath !== 'string') return ''

  const parts = filePath.split('/')
  return parts[parts.length - 1]
}

export function Head({ data: { post, author } }) {
  const location = useLocation()

  return (
    <Seo
      title={post.frontmatter.meta_title || post.frontmatter.title}
      description={post.frontmatter.meta_description}
      img={'https://aads.com/blog/images/logo.png'}
    >
      <meta property='og:title' content={post.frontmatter.meta_title} />
      <meta
        property='og:image'
        content={'https://aads.com/blog/images/logo.png'}
      />
      <meta
        property='og:url'
        content={`https://aads.com${location.pathname}`}
      />
      <meta property='og:type' content='website' />

      {post.frontmatter.json_ld ? (
        <script type='application/ld+json'>{post.frontmatter.json_ld}</script>
      ) : (
        <script type='application/ld+json'>
          {`{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.frontmatter.meta_title}",
            "datePublished": "${post.frontmatter.date}",
            "dateModified": "${post.frontmatter.date}",
            "author": [{
              "@type": "Person",
              "name": "${author.name}",
              "url": "https://aads.com/blog${author.slug}"
            }],
            "image": ["https://aads.com/blog/assets/${extractFilename(
              post.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData?.images?.fallback
                ?.src
            )}"]
          }`}
        </script>
      )}
    </Seo>
  )
}

const BlogPost = ({
  data
}) => {
  const { post, author } = data
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(`https://aads.com${window.location.pathname}`)
  }, [])

  return <MainLayout footerClassName={css.layoutFooter}>
    <div className={css.blogPost}>
      <div className={cn(css.container, 'container')}>
        <div className={css.main}>
          <div className={cn(css.breadcrumbs, 'breadcrumbs')}>
            <Link to="/">Blog</Link>
            <span className={'breadcrumbs__dot'} />
            <Link to={getCategoryPath(post.frontmatter.category_top_level[0])}>
              {post.frontmatter.category_top_level[0]}
            </Link>
          </div>
          <h1 className={css.title}>{post.frontmatter.title}</h1>
          <p className={css.date}>
            Updated: {formatDate(post.frontmatter.date)}
          </p>
          <div className={cn(css.author, 'mobile-visible')}>
            <Link to={author.fields.slug}>
              <div className={css.pic}>
                <Img
                  fixed={author.frontmatter.thumbnail?.childImageSharp.fixed}
                />
              </div>
              <div className={css.text}>
                <p className={css.name}>{author.frontmatter.name}</p>
                <p className={css.position}>{author.frontmatter.position}</p>
              </div>
            </Link>
          </div>
          <div className={css.articlePicture}>
            <Img
              fluid={post.frontmatter.thumbnail?.childImageSharp.fluid}
            />
          </div>
          {post.tableOfContents && <div className={cn(css.tableOfContentsMobile, 'mobile-visible')}>
            <Accordion allowMultipleExpanded={true} allowZeroExpanded={true} >
              <AccordionItem className={css.accordionItem}>
                <AccordionItemHeading className={css.accordionHeading}>
                  <AccordionItemButton>
                    <div className={css.button}>
                      <span>Show structure</span>
                      <span>Hide structure</span>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div
                    className={css.itemsWrap}
                    dangerouslySetInnerHTML={{__html: post.tableOfContents}}
                  />
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>}
          <article className={css.article}
            dangerouslySetInnerHTML={{__html: post.html}}
          />
        </div>

        <div className={css.sidebar}>
          <div className={css.stickyWrap}>
            <div className={css.author}>
              <Link to={author.fields.slug}>
                <div className={css.pic}>
                  <Img
                    fixed={author.frontmatter.thumbnail?.childImageSharp.fixed}
                  />
                </div>
                <p className={css.name}>{author.frontmatter.name}</p>
                <p className={css.position}>{author.frontmatter.position}</p>
              </Link>
            </div>

            <div className={cn(css.tableOfContents)}>
              {post.tableOfContents && <div className={css.tocMain}>
                <div className={css.tocContainer}>
                  <p className={css.tocTitle}>
                    Read in this article
                  </p>
                </div>

                <div
                  className={css.tocContainer}
                  dangerouslySetInnerHTML={{__html: post.tableOfContents}}
                />
              </div>}

              <div className={css.share}>
                <div className={css.tocContainer}>
                  <p>Share this article</p>
                  <div>
                    <TwitterShareButton url={url} title={'text'}>
                      <img
                        src={withPrefix('/images/twitter-share.svg')}
                        width={25}
                        height={25}
                        alt="twitter-share"
                      />
                    </TwitterShareButton>
                    <FacebookShareButton url={url} title={'text'}>
                      <img
                        src={withPrefix('/images/fb-share.svg')}
                        width={25}
                        height={25}
                        alt="fb-share"
                      />
                    </FacebookShareButton>
                    <LinkedinShareButton url={url} title={'text'}>
                      <img
                        src={withPrefix('/images/linkedin-share.svg')}
                        width={25}
                        height={25}
                        alt="linkedin-share"
                      />
                    </LinkedinShareButton>
                    {/* <button>
.                      <img
                        src={withPrefix('/images/link-share.svg')}
                        width={25}
                        height={25}
                        alt="link-share"
                      />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.shareMobile}>
        <div className={cn(css.shareContainer, 'container')}>
          <p>Share this<br />article</p>
          <div>
            <TwitterShareButton url={url} title={'text'}>
              <img
                src={withPrefix('/images/twitter-share.svg')}
                width={25}
                height={25}
                alt="twitter-share"
              />
            </TwitterShareButton>
            <FacebookShareButton url={url} title={'text'}>
              <img
                src={withPrefix('/images/fb-share.svg')}
                width={25}
                height={25}
                alt="fb-share"
              />
            </FacebookShareButton>
            <LinkedinShareButton url={url} title={'text'}>
              <img
                src={withPrefix('/images/linkedin-share.svg')}
                width={25}
                height={25}
                alt="linkedin-share"
              />
            </LinkedinShareButton>
            {/* <button>
              <img
                src={withPrefix('/images/link-share.svg')}
                width={25}
                height={25}
                alt="link-share"
              />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
}

export const pageQuery = graphql`
  query($slug: String!, $authorName: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
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
        meta_title
        json_ld
      }
      html
      tableOfContents
    }
    author: markdownRemark(frontmatter: { name: { eq: $authorName } }) {
      fields {
        slug
      }
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
