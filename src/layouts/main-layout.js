import React from 'react'

import Header from '../components/header.js'
import Footer from '../components/footer.js'

export default class extends React.Component {
  render() {
    const props = this.props

    return (
      <div>
        <Header />
          {props.children}
        <Footer />
      </div>
    )
  }
}
