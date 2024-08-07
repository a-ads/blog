import React from 'react'
import { graphql } from 'gatsby'
import cn from 'classnames'

import MainLayout from '/src/layouts/MainLayout'
import * as css from '/src/styles/templates/blog-post.module.scss'

const BlogPost = ({
  data,
  pageContext
}) => {
  const { html } = data.markdownRemark

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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BlogPost
