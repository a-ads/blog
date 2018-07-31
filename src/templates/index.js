import React from 'react'

import Jumbotron from '../components/jumbotron'
import Card from '../components/card'
import AadsServices from '../components/aads-services'
import Pagination from '../components/pagination'
import Subscribe from '../components/subscribe'
import jumbotron from '../components/jumbotron';

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.createArticlesPreview = this.createArticlesPreview.bind(this)
    this.createArticlesPreviewMobile = this.createArticlesPreviewMobile.bind(this)
    this.createJumbotron = this.createJumbotron.bind(this)
  }

  createArticlesPreview() {
    const {
      totalCount,
    } = this.props.data.allMarkdownRemark
    const posts = this.props.data.allMarkdownRemark.edges

    const articlesPreview = []

    posts.forEach(post => {
      articlesPreview.push(
        <Card 
          link={post.node.fields.slug}
          thumbnail={post.node.frontmatter.thumbnail}
          title={post.node.frontmatter.title}
          category={post.node.frontmatter.category}
        />
      )
    })

    return (
      <div className='l-card-group l-card-group--desktop'>
        <div className='l-card-group__card-container l-container'>
          {articlesPreview}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          {/* <Pagination /> */}
        </div>
      </div>
    )
  }

  createArticlesPreviewMobile() {
    const articlesPreviewMobile = []
    const articlesPreviewData = [{}, {}, {}, {}, {}, {}]

    articlesPreviewData.forEach(() => {
      articlesPreviewMobile.push(<Card />)
    })

    return (
      <div className='l-card-group l-card-group--mobile'>
        <div className='l-card-group__card-container l-container'>
          {articlesPreviewMobile}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          <div className='c-load-more-btn'>Load more</div>
        </div>
      </div>
    )
  }

  createJumbotron() {
    const { mainJumbotronSlug } = this.props.pathContext
    const posts = this.props.data.allMarkdownRemark.edges

    const jumbotronPost = posts[posts.findIndex((post) => {
      return post.node.fields.slug === mainJumbotronSlug
    })]

    if (!jumbotronPost) {
      return
    }

    return (
      <Jumbotron 
        title={jumbotronPost.node.frontmatter.title}
        category={jumbotronPost.node.frontmatter.category}
        link={jumbotronPost.node.fields.slug}
        thumbnail={jumbotronPost.node.frontmatter.thumbnail}
      />
    )
  }

  render() {
    return (
      <div>
        {this.createJumbotron()}
        {this.createArticlesPreview()}
        {this.createArticlesPreviewMobile()}
        <div className='l-container'>
          <Subscribe mobile />
        </div>
        <AadsServices />
      </div>
    )
  }
}

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: {regex: "/^\\/.*\\/(blog)\\/.*\\.md$/"}}
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            thumbnail
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
