import React from 'react'

import MainLayout from '../layouts/index'
import Jumbotron from '../components/jumbotron'
import Card from '../components/card'
import AadsServices from '../components/aads-services'
import Pagination from '../components/pagination'
import Subscribe from '../components/subscribe'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.createArticlesPreview = this.createArticlesPreview.bind(this)
    this.createArticlesPreviewMobile = this.createArticlesPreviewMobile.bind(this)
  }

  createArticlesPreview() {
    const {
      totalCount,
      edges  
    } = this.props.data.allMarkdownRemark
    const articlesPreview = []

    edges.forEach(edge => {
      articlesPreview.push(
        <Card 
          link={edge.node.fields.slug}
          thumbnail={edge.node.frontmatter.thumbnail}
          title={edge.node.frontmatter.title}
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

  render() {
    return (
      <div>
        <Jumbotron />
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
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
            thumbnail
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
