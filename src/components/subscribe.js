import React from 'react'
import SubscribeSuccessPopup from './subscribe-success-popup'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      emailSent: false
    }

    this.onEmailInputChange = this.onEmailInputChange.bind(this)
    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  render() {
    if (this.props.mobile) {
      return this.renderSubscribeMobile()
    } else {
      return this.renderSubscribe()
    }
  }

  renderSubscribe() {
    return(
      <div className='c-subscribe'>
        <div className='c-subscribe__container'> 
          <div className='c-subscribe__title'>
            Subscribe to our newsletter Be ready for useful content.
          </div>
          <div className='c-subscribe__small-text'>
            3 articles a week for earch heading. Minimum.
          </div>
          <form>
            <div className='c-subscribe__input-wrapper'>
              {this.renderEmailInput({
                placeholder: 'Your email'
              })}
            </div>
            <div className='c-subscribe__submit-wrapper'>
              {this.renderSubmit({value: 'Submit'})}
            </div>
            <div className='c-subscribe__privacy-policy'>
              By clicking the button you agree with our <a href='#'>privacy policy</a>
            </div>
          </form>  
        </div>

        <SubscribeSuccessPopup 
          open={this.isEmailSent()}
          onClose={() => {
            this.setState({
              emailSent: false
            })
          }}
          onCloseButtonClick={() => {
            this.setState({
              emailSent: false
            })
          }}
        />
      </div>
    )
  }

  renderSubscribeMobile() {
    return(
      <div className='c-subscribe c-subscribe--mobile'> 
        <div className='c-subscribe__wrapper'>
          {!this.isEmailSent() ?
            <div>
              <div className='c-subscribe__title'>Subscribe to our newsletter</div>
              <div className='c-subscribe__container'>
                <form>
                  <div className='c-subscribe__input-wrapper'>
                    {this.renderEmailInput({
                      placeholder: 'Enter yout email'
                    })}
                  </div>
                  <div className='c-subscribe__submit-wrapper'>
                    {this.renderSubmit()}
                  </div>
                </form>
              </div>
            </div>
          :
            <div className='c-subscribe__message-is-sent'>
              <p>Thanks! Please, check out your<br />email to confirm subscription.</p>
            </div>
          }
        </div>
      </div>
    )
  }

  isEmailSent() {
    return this.state.emailSent
  }

  renderEmailInput(attrs = {
    placeholder: ''
  }) {
    const {
      placeholder,
      ...rest
    } = attrs

    return(
      <input 
        type='text' 
        placeholder={placeholder}
        onChange={this.onEmailInputChange}
        value={this.state.email}
        {...rest}
      />
    )
  }

  onEmailInputChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  renderSubmit(attrs = {
    value: ''
  }) {
    const {
      value,
      ...rest
    } = attrs

    return(
      <input type='submit' value={value} onClick={this.onSubmitClick} {...rest} />
    )
  }

  onSubmitClick(event) {
    event.preventDefault()
    this.setState({
      emailSent: true
    })
  }
}
