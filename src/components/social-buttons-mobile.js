import React from 'react'
import SocialButtonsDesktop from './social-buttons-desktop'
import { withPrefix } from 'gatsby'

export default class extends SocialButtonsDesktop {
  render() {
    return (
      <div className='c-soc-share --mobile'>
        <div className='c-soc-share__container'>
          <a className='c-soc-share__item --facebook' onClick={this.onFacebookButtonClick}>
            <div className='c-soc-share__item-pic'><img src={withPrefix('/images/facebook_blue.svg')} alt='fb'/></div>
          </a>

          <a className='c-soc-share__item --twitter' onClick={this.onTwitterButtonClick}>
            <div className='c-soc-share__item-pic'><img src={withPrefix('/images/twitter_blue.svg')} alt='twitter'/></div>
          </a>

          {/* <a className='c-soc-share__item --medium' href='#'>
            <div className='c-soc-share__item-pic'><img src='/images/Medium.svg' alt='slack'/></div>
          </a> */}
        </div>
      </div>
    )
  }
}