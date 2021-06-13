import React from 'react'
import { withPrefix } from 'gatsby'

export default function BecomeCustomer() {
  return (
    <div className="become-customer">
      <div className="l-container">
        <Block
          title="Get more paying customers"
          img={<img src={withPrefix('/images/megaphone-colored.svg')} width="70" height="56" alt="megaphone"/>}
          href="https://a-ads.com/campaigns/new"
          list={(
            <ul>
              <li>CPD, CPM, CPA advertising models</li>
              <li>Payments in BTC and 20+ altcoins</li>
              <li>Crypto, gambling, NSFW ads allowed</li>
            </ul>
          )}
          textOnButton="Become an Advertiser"
        />
        <div className="become-customer__delimeter"/>
        <Block
          title="Monetize your traffic"
          img={<img src={withPrefix('/images/wallet-colored.svg')} width="55" height="56" alt="wallet"/>}
          href="https://a-ads.com/ad_units/new"
          list={(
            <ul>
              <li>Create and embed your ad unit in 5 minutes</li>
              <li>Extremely lightweight HTML code with no JS</li>
              <li>Earn up to 50% of our fees as an affiliate</li>
            </ul>
          )}
          textOnButton="Become a Publisher"
        />
      </div>
    </div>
  )
}


function Block({
  title,
  imgPath = '',
  img,
  list,
  textOnButton,
  href
}) {
  return (
    <div className="become-customer__block">
      <div className="become-customer__block-img-wrap">
        {img}
      </div>
      <div className="become-customer__block-main-wrap">
        <h3>{title}</h3>
        <div>
          {list}
        </div>
        <div className="become-customer__button-wrap">
          <a href={href} className="button">
            {textOnButton}
          </a>
        </div>
      </div>
    </div>
  )
}
