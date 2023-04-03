import React, { useState, useMemo, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import cn from 'classnames'
import { kebabCase } from 'lodash-es'
import { utcToZonedTime, format } from 'date-fns-tz'

import { Button, Icon, Link, List, ListItem } from '@ui'
import { SocialButton } from '@components'
import { Horn, Wallet } from '@icons'
import { SearchQueryProvider, SearchBar } from './Search'
import ModalRenderer from './modal/ModalRenderer'
import { showReportBugModal, showSuggestIdeaModal } from './modal/modals'
import type { SocialId } from './SocialButton'

const Header = ({ categoriesTopLevel }: { categoriesTopLevel: Categories }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false) // For mobile

  const Hamburger = (
    <div
      aria-label='Hamburger menu'
      className='w-8 h-8 relative cursor-pointer ml-auto mt-2 up-desktop:hidden'
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
        {categoriesTopLevel.map((cat) => (
          <Link
            key={cat.id}
            ghost
            text={cat.title}
            to={`/categories/${kebabCase(cat.title)}/`}
            style={{ order: cat.order }}
            baseCn='py-4 body-3 whitespace-nowrap font-medium hover:clr-primary rounded-none'
            className={cat.order == 3 ? 'border-none' : 'down-desktop:border-b'} // This disables the border on the last item on mobile
            onClick={() => (isHamburgerOpen ? setIsHamburgerOpen(false) : null)}
          />
        ))}
      </>
    ),
    [isHamburgerOpen]
  )

  const MobileNav = useMemo(
    () => (
      <div className='z-layout relative bg-base mt-10 container flex-center up-desktop:hidden'>
        <SearchBar className='w-full' />
        <nav className='absolute top-[70px] flex flex-col bg-base w-screen px-7 py-6 shadow-0'>
          {NavLinks}
        </nav>
      </div>
    ),
    [isHamburgerOpen]
  )

  return (
    <header className='bg-base py-5 shadow-[0 40px 80px -40px rgb(0 0 0 / 10%)]'>
      <div className='container flex gap-[7.5rem]'>
        <Link className='h-12 p-0' to='/'>
          <StaticImage
            src='../../static/images/logo.svg'
            alt='logo'
            placeholder='blurred'
            layout='fixed'
            width={90}
            height={50}
          />
        </Link>

        <div className='grid grid-cols-2 gap-44 down-desktop:hidden'>
          <nav className='flex-center body-3 gap-9'>{NavLinks}</nav>
          <SearchBar />
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
            <h4 className='body-1 mb-3 clr-blue !font-secondary !font-bold w-full'>
              {title}
            </h4>
            {items.map(({ name, to, onClick }) => {
              let props = {
                key: name,
                text: name,
                ghost: true,
                className:
                  'clr-secondary body-2 font-primary hover:clr-gray-3 mb-3',
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
                  className={cn({
                    'down-tablet:hidden': i > 2 && !canSeeMoreSocials, // Initially display only three buttons on mobile
                  })}
                />
                {!canSeeMoreSocials && i === 2 && (
                  <Button
                    ghost
                    text='See more'
                    onClick={() => setCanSeeMoreSocials(!canSeeMoreSocials)}
                    className='hidden down-tablet:inline-flex clr-blue font-normal font-primary'
                  />
                )}
              </Fragment>
            ))}
          </div>
          <span className='body-3 !font-bold clr-gray-4'>
            {getFormattedDate()}
          </span>
        </div>
        {[
          'The best advertising network with a great number of crypto currencies: bitcoin, ethereum, litecoin, dogecoin, dash etc',
          '© A-ADS 2011-2022',
        ].map((text) => (
          <p key={text} className='w-full body-2 clr-secondary text-center'>
            {text}
          </p>
        ))}
      </div>
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
              <h3 className='mt-8 mb-5'>{title}</h3>
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
                className='w-4/6 mt-auto down-desktop:w-full'
              >
                Become {i === 0 ? 'an advertiser' : 'a publisher'}
              </Link>
            </section>
          ))}
        </div>
      </div>
      <section aria-label='Ask us any questions'>
        <div className='container border-b w-11/12 pt-14 pb-8 flex-center flex-col gap-7'>
          <h2 className='h1 down-tablet:w-full'>
            <span className='clr-blue'>Ask us</span> any questions
          </h2>
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
