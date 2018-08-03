import React from 'react'
import Helmet from 'react-helmet';

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>test</title>
        </Helmet>
        {this.props.children()}
      </div>
    )
  }
}
