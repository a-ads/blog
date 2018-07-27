import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/header.js'
import Footer from '../components/footer.js'
import '../styles/main.scss'

export default ({ children, data }) => {
  const title = data.site.siteMetadata.title;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <div className='l-body'>
        {children()}
      </div>
      <Footer />
    </div>
  )
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
