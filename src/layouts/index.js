import React from 'react'

import Header from '../components/header.js'
import Footer from '../components/footer.js'
import '../styles/main.scss'

export default ({ children }) => (
  <div>
    <Header />
    <div className='l-body'>
      {children()}
    </div>
    <Footer />
  </div>
)
