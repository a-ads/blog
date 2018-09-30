import React from 'react'
import Popup from 'reactjs-popup'

export default class SubscribeSuccessPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open
    }
  }
 
  static getDerivedStateFromProps(props) {
    return {
      open: props.open
    }
  }

  render() {
    return (
      <Popup 
        className='c-subscribe-success-popup'
        closeOnEscape={true}
        lockScroll={true}
        modal={true}
        contentStyle={{
          width: '',
          padding: ''
        }}
        open={this.state.open}
        onClose={this.props.onClose}
      >
        <div>
          <div className='c-subscribe-success-popup__icon'><img src='/images/success.svg' /></div>
          <p className='c-subscribe-success-popup__title'>Thank you for subscription to blog updates!</p>
          <p className='c-subscribe-success-popup__close-button' onClick={this.props.onCloseButtonClick}>Back to blog</p>
        </div>
      </Popup>
    )
  }
}
