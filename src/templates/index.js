import React from 'react'
import _ from 'lodash'

import Layout from '../layouts/index'
import BlogPreview from '../components/blog-preview'
import CONFIG from '../config'

export default class extends React.Component {
  render() {
    return (
      <Layout>
        {this.renderBlogPreview()}
      </Layout>
    )
  }

  renderBlogPreview() {
    const { blogPostsChunk, pageIndex, postCount } = this.props.pageContext
    return <BlogPreview
      posts={blogPostsChunk}
      postCount={postCount}
      previewsPerPage={CONFIG.blogPreviewDesktop.previewsPerPage}
      pageIndex={pageIndex}
    />
  }
}
