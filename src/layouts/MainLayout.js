import React, { useEffect, useRef, useState, useContext } from 'react'
import cn from 'classnames'
import { Link, withPrefix } from 'gatsby'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import { useDesktopMediaQuery } from '/src/utils/breakpoint'
import { SearchContext } from '/src/context/SearchContext'
import * as css from './style.module.scss'

const MainLayout = props => {
  const { children, footerClassName } = props
  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const searchInputRef = useRef(null)
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)
  const isDesktop = useDesktopMediaQuery()

  useEffect(() => {
    if (searchIsOpen && searchInputRef) {
      searchInputRef.current.focus()
    }
  }, [searchIsOpen, searchInputRef])

  useEffect(() => {
    if (isDesktop) {
      setIsBurgerMenuOpened(false)
    }
  }, [isDesktop, setIsBurgerMenuOpened])

  const clickSearchOpenHandler = () => {
    setSearchIsOpen(true)
  }

  const changeSearchInputHandler = e => {
    setSearchQuery(e.target.value)
  }

  const clickSearchCloseHandler = () => {
    setSearchIsOpen(false)
  }

  const clickBurgerMenuTriggerHandler = () => {
    setIsBurgerMenuOpened(!isBurgerMenuOpened)
  }

  return (<>
    <header className={css.header}>
      <div className={cn(css.container, 'container')}>
        <Link to="/" className={css.logo}>
          <img src={withPrefix('/images/logo.svg')} alt='aads logo' width={132} height={45} />
        </Link>

        <div className={css.navigation}>
          <Link to='/categories/advertisers/'>Advertisers</Link>
          <Link to='/categories/publishers/'>Publishers</Link>
          <Link to='/categories/news-trends/'>News & Trends</Link>
          <Link to='/categories/guides/'>Guides</Link>
          <div className={cn(css.search, searchIsOpen && css.open)}>
            <form className={css.inputWrap} method='get' action={withPrefix('/search')}>
              <button className={css.searchBtn} type='submit' />
              <input name='query' value={searchQuery} onChange={changeSearchInputHandler} ref={searchInputRef} />
              <div className={css.closeBtn} onClick={clickSearchCloseHandler} />
            </form>
            <button onClick={clickSearchOpenHandler}>
              <img src={withPrefix('/images/search.svg')} width={28} height={28} alt='search icon' />
            </button>
          </div>
        </div>

        <div className={css.buttonWrap}>
          <a className='button' href='/'>Go to AADS network</a>
        </div>

        <div className={css.burgerMenu}>
          <div className={css.burgerMenuTrigger} onClick={clickBurgerMenuTriggerHandler}>
            <img src={withPrefix(isBurgerMenuOpened ? '/images/burger-close.svg' : '/images/burger.svg')} width={33} height={33} />
          </div>
        </div>
        <div className={css.burgerMenuContainer} hidden={!isBurgerMenuOpened}>
          <div className='container'>
            <div className={cn(css.search, css.open)}>
              <form className={css.inputWrap} method='get' action={withPrefix('/search')}>
                <button className={css.searchBtn} type='submit' />
                <input
                  name='query'
                  value={searchQuery}
                  onChange={changeSearchInputHandler}
                  placeholder='Search here'
                />
              </form>
            </div>
            <div className={css.links}>
              <p><Link to='/categories/advertisers/'>Advertisers</Link></p>
              <p><Link to='/categories/publishers/'>Publishers</Link></p>
              <p><Link to='/categories/news-trends/'>News & Trends</Link></p>
              <p><Link to='/categories/guides/'>Guides</Link></p>
            </div>
            <div className={css.buttonWrap}>
              <a className='button' href='/'>Go to AADS network</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main className={css.main}>
      {children}
    </main>

    <footer className={cn(css.footer, footerClassName)}>
      <div className={css.captionWrap}>
        <div className='container'>
          <p className={cn('text-secondary-color')}>
            AADS crypto ad network has been working with crypto and non-crypto websites since 2011,
            providing banner ad solutions. As a trusted Bitcoin advertising network, we prioritize
            delivering high-quality crypto ads to amplify your campaign's impact
          </p>
        </div>
      </div>

      <div className={css.navigationWrap}>
        <div className={cn(css.container, 'container phone-hidden')}>
          <ul>
            <li><strong>Advertising</strong></li>
            <li><a href="/advertise/">Banner advertising</a></li>
            <li><a href="/marketplace/advertiser/">Content ad publication</a></li>
            <li><a href="/crypto-affiliate-program/">Affiliate program</a></li>
          </ul>
          <ul>
            <li><strong>Earning</strong></li>
            <li><a href="/earn/">Banner ad traffic monetization</a></li>
            <li><a href="/publisher/">Earning from ad publication</a></li>
            <li><a href="/crypto-referral-program/">Referral program</a></li>
          </ul>
          <ul>
            <li><strong>Collaborations</strong></li>
            <li><a href="/advertising-agencies/">Marketing agencies</a></li>
            <li><a href="/blog/elevate-your-startups-global-fame/">Startups</a></li>
            <li><a href="/bug-bounty/">Bug bounty program</a></li>
          </ul>
          <ul>
            <li><strong>Service</strong></li>
            <li><a href="/statistics/">Network Statistics</a></li>
            <li><a href="https://status.a-ads.com/en/" target="_blank" rel="noreferrer">System Status</a></li>
            <li><a href="https://help.aads.com/en/">Help Center</a></li>
          </ul>
          <ul>
            <li><strong>Company</strong></li>
            <li><a href="/about-us/">About us</a></li>
            <li><a href="/team/">Our Team</a></li>
            <li><a href="/blog/">Blog</a></li>
          </ul>
        </div>

        <div className={cn(css.container, 'phone-visible')}>
          <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}  className={css.accordion}>
            <AccordionItem className={css.accordionItem}>
              <AccordionItemHeading className={css.accordionHeading}>
                <AccordionItemButton>
                  <p className='container'><strong>Advertising</strong></p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={css.accordionPanel}>
                <ul className='container'>
                  <li><a href="/advertise/">Banner advertising</a></li>
                  <li><a href="/marketplace/advertiser/">Content ad publication</a></li>
                  <li><a href="/crypto-affiliate-program/">Affiliate program</a></li>
                </ul>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={css.accordionItem}>
              <AccordionItemHeading className={css.accordionHeading}>
                <AccordionItemButton>
                  <p className='container'><strong>Earning</strong></p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={css.accordionPanel}>
                <ul className='container'>
                  <li><a href="/earn/">Banner ad traffic monetization</a></li>
                  <li><a href="/publisher/">Earning from ad publication</a></li>
                  <li><a href="/crypto-referral-program/">Referral program</a></li>
                </ul>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={css.accordionItem}>
              <AccordionItemHeading className={css.accordionHeading}>
                <AccordionItemButton>
                  <p className='container'><strong>Collaborations</strong></p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={css.accordionPanel}>
                <ul className='container'>
                  <li><a href="/advertising-agencies/">Marketing agencies</a></li>
                  <li><a href="/blog/elevate-your-startups-global-fame/">Startups</a></li>
                  <li><a href="/bug-bounty/">Bug bounty program</a></li>
                </ul>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={css.accordionItem}>
              <AccordionItemHeading className={css.accordionHeading}>
                <AccordionItemButton>
                  <p className='container'><strong>Service</strong></p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={css.accordionPanel}>
                <ul className='container'>
                  <li><a href="/statistics/">Network Statistics</a></li>
                  <li><a href="https://status.a-ads.com/en/" target="_blank" rel="noreferrer">System Status</a></li>
                  <li><a href="https://help.aads.com/en/">Help Center</a></li>
                </ul>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={css.accordionItem}>
              <AccordionItemHeading className={css.accordionHeading}>
                <AccordionItemButton>
                  <p className='container'><strong>Company</strong></p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={css.accordionPanel}>
                <ul className='container'>
                  <li><a href="/about-us/">About us</a></li>
                  <li><a href="/team/">Our Team</a></li>
                  <li><a href="/blog/">Blog</a></li>
                </ul>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className={css.bottomWrap}>
        <div className={cn(css.container, 'container')}>
          <div className={css.copyrightAndLinks}>
            <p>© AADS 2011-2024</p>
            <p><a href="/terms_of_service/">Terms of Service</a></p>
            <p><a href="/privacy_policy/">Privacy Policy</a></p>
          </div>
          <div className={css.socButtons}>
            <a href="https://twitter.com/aads_network" target="_blank" rel="noreferrer">
              <img src={withPrefix('/images/twitter.svg')} width={40} height={40} />
            </a>
            <a href="https://t.me/aads_network" target="_blank" rel="noreferrer">
              <img src={withPrefix('/images/telegram.svg')} width={40} height={40} />
            </a>
            <a href="https://www.reddit.com/r/aadsnetwork/" target="_blank" rel="noreferrer">
              <img src={withPrefix('/images/reddit.svg')} width={40} height={40} />
            </a>
            <a href="https://bitcointalk.org/index.php?topic=140822" target="_blank" rel="noreferrer" className="phone-hidden">
              <img src={withPrefix('/images/bitcoin.svg')} width={40} height={40} />
            </a>
            <a href="https://instagram.com/aads.network" target="_blank" rel="noreferrer">
              <img src={withPrefix('/images/instagram.svg')} width={40} height={40} />
            </a>
            <a href="https://www.facebook.com/aads.network/" target="_blank" rel="noreferrer">
              <img src={withPrefix('/images/facebook.svg')} width={40} height={40} />
            </a>
            <a href="https://www.linkedin.com/company/aads-network/" target="_blank" rel="noreferrer">
              <img src={withPrefix('/images/linkedin.svg')} width={40} height={40} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </>)
}

export default MainLayout
