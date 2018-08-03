import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)    
  }

  render() {
    return(
      <div className='c-pagination'>
        {this.renderPaginationLinks()}
      </div>
    )
  }

  renderPaginationLinks() {
    return (
      <div>
        <a href='#'>{'<'}</a>
        <a href='#'>1</a>
        <a className='--elipsis' href='#'>...</a>
        <a href='#'>10</a>
        <a className='--active' href='#'>11</a>
        <a href='#'>12</a>
        <a className='--elipsis' href='#'>...</a>
        <a href='#'>18</a>
        <a href='#'>{'>'}</a>
      </div>
    )
  }

  getPaginationLinks() {

  }


}
