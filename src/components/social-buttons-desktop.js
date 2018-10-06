import React from 'react'
import { getCurrentPath } from '../helpers'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.onFacebookButtonClick = this.onFacebookButtonClick.bind(this)
    this.onTwitterButtonClick = this.onTwitterButtonClick.bind(this)
  }

  onFacebookButtonClick() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${getCurrentPath()}`, '', 'width=600,height=400')
  }

  onTwitterButtonClick() {
    window.open(`https://twitter.com/intent/tweet?url=${getCurrentPath()}`, '', 'width=600,height=400')
  }

  render() {
    return (
      <div className='c-soc-share-wrapper --desktop'>
        <div className='c-soc-share --desktop'>
          <div className='c-soc-share__container'>
            <a className='c-soc-share__item --facebook' onClick={this.onFacebookButtonClick}>
              <div className='c-soc-share__item-pic'><img src='/images/facebook_blue.svg' alt='fb'/></div>
            </a>

            <a className='c-soc-share__item --twitter' onClick={this.onTwitterButtonClick}>
              <div className='c-soc-share__item-pic'><img src='/images/twitter_blue.svg' alt='twitter'/></div>
            </a>

            {/* <a className='c-soc-share__item --medium' href='#'>
              <div className='c-soc-share__item-pic'><img src='/images/Medium.svg' alt='slack'/></div>
            </a> */}
          </div>
        </div>
      </div>
    )
  }
}
