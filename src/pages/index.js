import React from 'react'

import MainLayout from '../layouts/index'
import Jumbotron from '../components/jumbotron'
import Card from '../components/card'
import AadsServices from '../components/aads-services'
import Pagination from '../components/pagination'
import Subscribe from '../components/subscribe'
import Helmet from 'react-helmet'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.createArticlesPreview = this.createArticlesPreview.bind(this)
    this.createArticlesPreviewMobile = this.createArticlesPreviewMobile.bind(this)
  }

  createArticlesPreview() {
    const articlesPreview = []
    const articlesPreviewData = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

    articlesPreviewData.forEach(() => {
      articlesPreview.push(<Card />)
    })

    return (
      <div className='l-card-group l-card-group--desktop'>
        <div className='l-card-group__card-container l-container'>
          {articlesPreview}
        </div>
        <div className='l-card-group__pagination-container l-container'>
          <Pagination />
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
    const { title } = this.props.data.site.siteMetadata

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
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
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
