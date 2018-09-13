import React from 'react'
import { getCurrentURL } from '../helpers'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.onFacebookButtonClick = this.onFacebookButtonClick.bind(this)
  }

  onFacebookButtonClick() {
    const currentUrl = getCurrentURL()
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, "_blank")
  }

  render() {
    return (
      <div className='c-soc-share-wrapper --desktop'>
        <div className='c-soc-share --desktop'>
          <div className='c-soc-share__container'>
            <button className='c-soc-share__item --facebook' onClick={this.onFacebookButtonClick}>
              <div className='c-soc-share__item-pic'><img src='/images/fb-share.svg' alt='fb'/></div>
              <div className='c-soc-share__item-counter'>10</div>
            </button>

            <a className='c-soc-share__item --twitter' href='#'>
              <div className='c-soc-share__item-pic'><img src='/images/twitter-share.svg' alt='twitter'/></div>
              <div className='c-soc-share__item-counter'>8</div>
            </a>

            <a className='c-soc-share__item --slack' href='#'>
              <div className='c-soc-share__item-pic'><img src='/images/slack-share.svg' alt='slack'/></div>
              <div className='c-soc-share__item-counter'>8</div>
            </a>

            <a className='c-soc-share__item --fb-messenger' href='#'>
              <div className='c-soc-share__item-pic'><img src='/images/fb-messenger-share.svg' alt='fb-messenger'/></div>
              <div className='c-soc-share__item-counter'>8</div>
            </a>

            <a className='c-soc-share__item --linkedin' href='#'>
              <div className='c-soc-share__item-pic'><img src='/images/linkedin-share.svg' alt='linkedin'/></div>
              <div className='c-soc-share__item-counter'>8</div>
            </a>

            <a className='c-soc-share__item --email' href='#'>
              <div className='c-soc-share__item-pic'><img src='/images/email-share.svg' alt='email'/></div>
              <div className='c-soc-share__item-counter'>8</div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
