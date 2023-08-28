import React, { useState, useMemo, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import cn from 'classnames'
import { utcToZonedTime, format } from 'date-fns-tz'
import 'prismjs/themes/prism.css'

import { Button, Icon, Link, List, ListItem } from '@ui'
import { SocialButton } from '@components'
import { Horn, Wallet, LogoRedirect } from '@icons'
import { SearchQueryProvider, SearchBar } from './Search'
import ModalRenderer from './modal/ModalRenderer'
import { showReportBugModal, showSuggestIdeaModal } from './modal/modals'
import { toCategoryLink } from '@utils'
import type { SocialId } from './SocialButton'
import SvgSearchIcon from './icons/SearchIcon'

const Header = ({ categoriesTopLevel }: { categoriesTopLevel: Categories }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false) // For mobile
  const [isSearch, setIsSearch] = useState(false)

  const Hamburger = (
    <div
      aria-label='Hamburger menu'
      className='w-8 h-8 relative cursor-pointer mt-2 up-desktop:hidden'
      onClick={() => setIsHamburgerOpen((prev) => !prev)}
    >
      {/* Three lines  */}
      {['top-0', 'top-[12px]', 'top-[24px]'].map((classname) => (
        <span
          aria-label='Hambuger line'
          key={classname}
          className={cn(
            'block absolute h-1 w-full bg-blue rounded-lg opacity-100 left-0 duration-[0.25s] ease-in-out rotate-0',
            classname,
            // Classes for each line in the open state
            {
              'odd:top-[18px] first:rotate-[135deg]': isHamburgerOpen,
              'even:opacity-0 even:left-[-60px]': isHamburgerOpen,
              'last:rotate-[-135deg]': isHamburgerOpen,
            }
          )}
        />
      ))}
    </div>
  )

  const NavLinks = useMemo(
    () => (
      <>
        {categoriesTopLevel
          .sort((a, b) => a.order - b.order)
          .map((cat) => (
            <Link
              key={cat.id}
              ghost
              text={cat.title}
              to={toCategoryLink(cat.title, 'all')}
              baseCn='hover-social py-4 text-base leading-6 font-medium text-gray-800 white space-nowrap hover:clr-primary rounded-none'
              className={
                cat.order == 3 ? 'border-none' : 'down-desktop:border-b'
              } // This disables the border on the last item on mobile
              onClick={() =>
                isHamburgerOpen ? setIsHamburgerOpen(false) : null
              }
            />
          ))}
      </>
    ),
    [isHamburgerOpen]
  )

  const MobileNav = useMemo(
    () => (
      <div className='z-layout relative bg-base mt-10 flex-center up-desktop:hidden search-wrap'>
        <SearchBar className='w-full search-form' />
        <nav className='absolute top-[70px] flex flex-col bg-base w-screen px-7 py-6 shadow-0 navigation'>
          {NavLinks}
        </nav>
      </div>
    ),
    [isHamburgerOpen]
  )

  return (
    <header className='bg-base py-5 shadow-[0 40px 80px -40px rgb(0 0 0 / 10%)]'>
      <div className='container flex align-middle justify-between header-mobile'>
        <Link className='h-12 p-0' to='/'>
          <StaticImage
            src='../../static/images/logo.svg'
            alt='logo'
            placeholder='blurred'
            layout='fixed'
            width={90}
            height={50}
            quality={100}
            className={'logo-img'}
          />
        </Link>
        <Link
          className='btn-redirect up-desktop:hidden'
          to={'https://a-ads.com'}
        >
          <div className={'logo-btn'}>
            <LogoRedirect />
          </div>
          <span className='btn-text btn-text__mobile'>Go to A-ADS network</span>
        </Link>

        <div className='nav-wrap down-desktop:hidden'>
          {!isSearch && <nav className='flex-center nav-block'>{NavLinks}</nav>}
          {isSearch && (
            <SearchBar
              className='search-bar'
              setIsSearch={setIsSearch}
              isSearch={isSearch}
            />
          )}
          <div className='wrap-search'>
            {!isSearch && (
              <SvgSearchIcon
                fill='#03A9F4'
                className='nav-search'
                onClick={() => setIsSearch(true)}
              />
            )}
          </div>
          <Link className='btn-redirect' to={'https://a-ads.com'}>
            <LogoRedirect />
            <span className='btn-text'>Go to A-ADS network</span>
          </Link>
        </div>

        {Hamburger}
      </div>

      {isHamburgerOpen && MobileNav}
    </header>
  )
}

const Footer = () => {
  const [canSeeMoreSocials, setCanSeeMoreSocials] = useState(false) // For mobile

  const getFormattedDate = () => {
    const date = new Date()
    const timeZone = 'UTC'
    const formatString = 'd MMMM yyyy, HH:mm zzz'

    const zonedDate = utcToZonedTime(date, timeZone)
    const formattedDate = format(zonedDate, formatString, { timeZone })

    return formattedDate
  }

  return (
    <footer>
      <div className='container flex flex-wrap pt-14'>
        {[
          {
            title: 'Advertising',
            items: [
              // { name: 'Pay-per-Day', to: 'https://a-ads.com/campaigns/new' },
              // { name: 'Pay-for-Result', to: 'http://blog.anonymousads.com/2015/04/receive-free-traffic-pay-after-you-get.html' },
              { name: 'Create Ad', to: 'https://a-ads.com/campaigns/new' },
              {
                name: 'Catalog of Ad Units',
                to: 'https://a-ads.com/catalog',
              },
            ],
          },
          {
            title: 'For partners',
            items: [
              { name: 'Earn with us', to: 'https://a-ads.com/ad_units/new' },
              {
                name: 'Affiliate campaigns',
                to: 'https://a-ads.com/affiliate_programs',
              },
              {
                name: 'Our affiliate program',
                to: 'https://a-ads.com/campaigns/1/rewards',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              { name: 'Blog', to: 'https://a-ads.com/blog/' },
              { name: 'About us', to: 'https://a-ads.com/about_us' },
              { name: 'Contacts', to: 'https://a-ads.com/contact_us' },
            ],
          },
          {
            title: 'Information',
            items: [
              {
                name: 'Terms of Service',
                to: 'https://a-ads.com/terms_of_service',
              },
              {
                name: 'Privacy Policy',
                to: 'https://a-ads.com/privacy_policy',
              },
              { name: 'Statistics', to: 'https://a-ads.com/stats' },
            ],
          },
          {
            title: 'Service',
            items: [
              { name: 'Get Help', to: 'https://help.a-ads.com/en/' },
              { name: 'Report a bug', onClick: showReportBugModal },
              { name: 'Suggest an idea', onClick: showSuggestIdeaModal },
              { name: 'Status Page', to: 'https://status.a-ads.com/en/' },
            ],
          },
        ].map(({ title, items }) => (
          // Column
          <section
            key={title}
            aria-label={title}
            className='flex flex-col up-desktop:w-1/5 min-w-[230px] mb-8'
          >
            <h3 className='body-1 mb-3 clr-blue !font-secondary !font-bold w-full'>
              {title}
            </h3>
            {items.map(({ name, to, onClick }) => {
              let props = {
                key: name,
                text: name,
                ghost: true,
                className:
                  'text-contrast clr-secondary body-2 font-primary hover:clr-gray-3 mb-3',
              }
              const buttonProps = { onClick }
              const linkProps = { to, external: true }

              props = to
                ? { ...props, ...linkProps }
                : { ...props, ...buttonProps }

              const Component = to ? Link : Button

              // @ts-ignore
              return <Component {...props} />
            })}
          </section>
        ))}
        <div className='flex-center gap-8 w-full mb-8 down-tablet:flex-col-reverse'>
          <div className='flex-center flex-wrap gap-7'>
            {(
              [
                'twitter',
                'fb',
                'btc',
                'telegram',
                'linkedin',
                'instagram',
                'reddit',
              ] as SocialId[]
            ).map((socialId, i) => (
              <Fragment key={socialId}>
                <SocialButton
                  socialId={socialId}
                  title={socialId}
                  className={cn('icon-hover', {
                    'down-tablet:hidden': i > 2 && !canSeeMoreSocials, // Initially display only three buttons on mobile
                  })}
                />
                {!canSeeMoreSocials && i === 2 && (
                  <Button
                    ghost
                    text='See more'
                    onClick={() => setCanSeeMoreSocials(!canSeeMoreSocials)}
                    className='icon-hover hidden down-tablet:inline-flex clr-blue font-normal font-primary'
                  />
                )}
              </Fragment>
            ))}
          </div>
          <span className='text-contrast body-3 !font-bold clr-gray-4'>
            {getFormattedDate()}
          </span>
        </div>
        {[
          'The best advertising network with a great number of crypto currencies: bitcoin, ethereum, litecoin, dogecoin, dash etc',
          '© A-ADS 2011-2023',
        ].map((text) => (
          <p
            key={text}
            className='w-full body-2 clr-secondary text-center text-contrast'
          >
            {text}
          </p>
        ))}
      </div>
      <div className='text-center text-gray-400 text-xs'>version: 16</div>
    </footer>
  )
}

type Categories = {
  id: string
  order: number
  title: CategoriesTopLevelNames
}[]
interface ITopLevelCategoriesQuery {
  allBlogCategoriesTopLevelYaml: {
    nodes: Categories
  }
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data: ITopLevelCategoriesQuery = useStaticQuery(graphql`
    query FetchTopLevelCategories {
      allBlogCategoriesTopLevelYaml {
        nodes {
          id
          order
          title
        }
      }
    }
  `)

  return (
    <>
      <ModalRenderer />
      <SearchQueryProvider>
        <Header categoriesTopLevel={data.allBlogCategoriesTopLevelYaml.nodes} />
        {children}
      </SearchQueryProvider>
      {/* Boxes before Ask Us  */}
      <div className='bg-gradient'>
        <div className='container flex justify-center gap-8 down-tablet:flex-col down-tablet:items-center py-20 tablet:py-15 phone:py-10'>
          {[
            {
              icon: <Horn />,
              title: 'Get more paying customers',
              listItems: [
                'CPD, CPA and Revenue sharing models',
                'Global audience coverage',
                'Payments using various cryptocurrencies',
              ],
            },
            {
              icon: <Wallet />,
              title: 'Earn crypto on your website',
              listItems: [
                'Simple HTML code embeddable in any website',
                "We don't collect your users' personal data",
                'Transparent payouts and live statistics',
              ],
            },
          ].map(({ icon, title, listItems }, i) => (
            <section
              key={title}
              aria-label={title}
              className='w-1/2 max-w-[564px] down-tablet:w-full pt-5 pb-8 px-10 down-desktop:px-6 flex flex-col bg-base rounded-lg shadow-[0px 40px 80px -40px rgba(0, 0, 0, 0.1)]'
            >
              <Icon i={icon} className='h-16 w-16' />
              <h2 className='mt-8 mb-5'>{title}</h2>
              <List className='flex-col gap-3 mb-10' bulleted>
                {listItems.map((item) => (
                  <ListItem key={item} text={item} />
                ))}
              </List>
              <Link
                primary
                to={`https://a-ads.com/${
                  i === 0 ? 'campaigns/new' : 'ad_units/new'
                }`}
                className='hover-link w-4/6 mt-auto down-desktop:w-full'
              >
                Become {i === 0 ? 'an advertiser' : 'a publisher'}
              </Link>
            </section>
          ))}
        </div>
      </div>
      <section aria-label='Ask us any questions'>
        <div className='container border-b w-11/12 pt-14 pb-8 flex-center flex-col gap-7'>
          <h3 className='h1 down-tablet:w-full'>
            <span className='clr-blue'>Ask us</span> any questions
          </h3>
          <div className='flex-center w-full gap-x-20 gap-y-4 down-tablet:flex-col down-tablet:items-start'>
            {(['tg', 'fbmessenger', 'support'] as SocialId[]).map(
              (socialId) => (
                <SocialButton withText key={socialId} socialId={socialId} />
              )
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default RootLayout
