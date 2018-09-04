import React from 'react'

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
        {!this.isEmailSent() ? 
          <div className='c-subscribe__container'> 
            <form>
              <div className='c-subscribe__input-wrapper'>
                {this.renderEmailInput({
                  placeholder: 'Enter email to get weekly newsletter...'
                })}
              </div>
              <div className='c-subscribe__submit-wrapper'>
                {this.renderSubmit({value: 'Subscribe'})}
              </div>
            </form>  
          </div>
        :
          <div className='c-subscribe__message-is-sent'>
            <p>Thanks! Please, check out your email to confirm subscription.</p>
          </div>
        }
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
