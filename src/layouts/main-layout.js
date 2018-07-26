import React from 'react'

import Header from '../components/header.js'
import Footer from '../components/footer.js'
import '../styles/main.scss'

export default ({ children, data }) => (
  <div>
    <Header />
    <div className='l-body'>
      {children}
    </div>
    <Footer />
  </div>
)

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
