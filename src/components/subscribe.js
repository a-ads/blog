import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    if (this.props.mobile) {
      return (<SubscribeMobile />)
    } else {
      return (<Subscribe />)
    }
  }
}

const Subscribe = () => (
  <div className='c-subscribe'>
    <div className='c-subscribe__container'> 
      <form>
        <div className='c-subscribe__input-wrapper'>
          <input type='text' placeholder='Enter email to get weekly newsletter...'/>
        </div>
        <div className='c-subscribe__submit-wrapper'>
          <input type='submit' value='Subscribe'/>
        </div>
      </form>
    </div>
  </div>
)

const SubscribeMobile = () => (
  <div className='c-subscribe c-subscribe--mobile'> 
    <div className='c-subscribe__wrapper'>
      <div className='c-subscribe__title'>Subscribe to our newsletter</div>
      <div className='c-subscribe__container'>
        <form>
          <div className='c-subscribe__input-wrapper'>
            <input type='text' placeholder='Enter your email'/>
          </div>
          <div className='c-subscribe__submit-wrapper'>
            <input type='submit' value=''/>
          </div>
        </form>
      </div>
    </div>
  </div>
)
