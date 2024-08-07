import React from 'react'
import cn from 'classnames'

import * as css from './style.module.scss'
import '/src/styles/main.scss'

const MainLayout = props => {
  const { children } = props

  return (<>
    <header className={css.header}>
      <div className={cn(css.container, 'container')}>
        <a className={css.logo}>
          <img src='/images/logo.svg' alt='aads logo' width={132} height={45} />
        </a>

        <div className={css.navigation}>
          <a href='#'>Advertisers</a>
          <a href='#'>Publishers</a>
          <a href='#'>News & Trends</a>
          <a href='#'>Guides</a>
          <div className={css.search}>
            <img src='/images/search.svg' width={28} height={28} alt='search icon' />
          </div>
        </div>

        <div className={css.buttonWrap}>
          <a className='button'>Go to AADS network</a>
        </div>
      </div>
    </header>

    <main className={css.main}>
      {children}
    </main>

    <footer className={css.footer}>
      <div className={css.captionWrap}>
        <div className='container'>
          <p className={cn('text-secondary-color')}>
            A-ADS crypto ad network has been working with crypto and non-crypto websites since 2011, 
            providing banner ad solutions. As a trusted Bitcoin advertising network, we prioritize 
            delivering high-quality crypto ads to amplify your campaign's impact
          </p>
        </div>
      </div>

      <div className={css.navigationWrap}><img />
        <div className={cn(css.container, 'container')}>
          <ul>
            <li><strong>Advertising</strong></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
          </ul>
          <ul>
            <li><strong>Earning</strong></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
          </ul>
          <ul>
            <li><strong>Collaborations</strong></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
          </ul>
          <ul>
            <li><strong>Service</strong></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
          </ul>
          <ul>
            <li><strong>Company</strong></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
            <li><a href="#">Banner ad traffic monetization</a></li>
          </ul>
        </div>
      </div>

      <div className={css.bottomWrap}>
        <div className={cn(css.container, 'container')}>
          <div className={css.copyrightAndLinks}>
            <p>© A-ADS 2011-2024</p>
            <p><a href="#">Terms of Service</a></p>
            <p><a href="#">Privacy Policy</a></p>
          </div>
          <div className={css.socButtons}>
            <a href='#'>
              <img src='/images/twitter.svg' width={41} height={41} />
            </a>
            <a href='#'>
              <img src='/images/telegram.svg' width={41} height={41} />
            </a>
            <a href='#'>
              <img src='/images/reddit.svg' width={41} height={41} />
            </a>
            <a href='#'>
              <img src='/images/bitcoin.svg' width={41} height={41} />
            </a>
            <a href='#'>
              <img src='/images/instagram.svg' width={41} height={41} />
            </a>
            <a href='#'>
              <img src='/images/facebook.svg' width={41} height={41} />
            </a>
            <a href='#'>
              <img src='/images/linkedin.svg' width={41} height={41} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </>)
}

export default MainLayout
