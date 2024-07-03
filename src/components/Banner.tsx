import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import cn from 'classnames'

import { Link } from '@ui'

// This component renders an optimized background image with art direction (different images for different screen sizes)
// Replace with Gatsby Static Image in the future todo
const ArtDirectedBackground: React.FC<{
  children: React.ReactNode
  variant: BannerProps['variant']
}> = ({ children, variant }) => {
  const {
    discoverDesktop,
    discoverTablet,
    discoverPhone,
    promoteDesktop,
    promoteTablet,
    promotePhone,
  } = useStaticQuery(
    graphql`
      query {
        discoverDesktop: file(
          relativePath: { eq: "banners/discover/promo.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 4160, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        discoverTablet: file(
          relativePath: { eq: "banners/discover/tablet.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        discoverPhone: file(
          relativePath: { eq: "banners/discover/mobile.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 450, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        promoteDesktop: file(
          relativePath: { eq: "banners/promote/desktop.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 4160, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        promoteTablet: file(
          relativePath: { eq: "banners/promote/tablet.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        promotePhone: file(relativePath: { eq: "banners/promote/phone.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 450, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )

  const discoverSources = [
    discoverTablet.childImageSharp.fluid,
    {
      ...discoverDesktop.childImageSharp.fluid,
      media: `(min-width: 1100px)`,
    },
    {
      ...discoverPhone.childImageSharp.fluid,
      media: `(max-width: 510px)`,
    },
  ]

  const promoteSources = [
    promoteTablet.childImageSharp.fluid,
    {
      ...promoteDesktop.childImageSharp.fluid,
      media: `(min-width: 1100px)`,
    },
    {
      ...promotePhone.childImageSharp.fluid,
      media: `(max-width: 767px)`,
    },
  ]

  return (
    <BackgroundImage
      Tag='div'
      id={variant}
      fixed={variant === 'discover' ? discoverSources : promoteSources}
    >
      {children}
    </BackgroundImage>
  )
}

const variants = {
  discover: {
    title: (
      <span className='banner-title'>
        Advertise your project on Marketplace
      </span>
    ),
    subtitle: (
      <span className='banner-subtitle'>
        Distribute press releases, articles, social media posts, and ad videos safe and easily
      </span>
    ),
    button: (
      <Link
        secondary
        external
        text='Explore Marketplace'
        to='https://a-ads.com/marketplace/'
        className='hover-btn banner-btn max-w-[287px] mt-6'
      />
    ),
  },
  promote: {
    title: (
      <>
        Promote A-ADS <br className='up-phone:hidden' /> and earn crypto
      </>
    ),
    subtitle: 'Get up to 10% of referred advertisers’ spedings',
    button: (
      <Link
        secondary
        text='Get a referral link'
        to='https://a-ads.com/blog/become-our-affiliate-partner-and-take-50-of-our-fees/'
        className='hover-btn max-w-[287px] mt-6'
      />
    ),
  },
}

type BannerProps = {
  variant?: keyof typeof variants
}

const Banner: React.FC<BannerProps> = ({ variant = 'discover' }) => {
  const { title, subtitle, button } = variants[variant]

  return (
    <ArtDirectedBackground variant={variant}>
      <div className={cn('flex items-center clr-base w-screen', {
        'min-h-[325px] up-sm:pl-[40vw]': variant === 'promote',
        'min-h-[198px]': variant !== 'promote',
        'up-xl:min-h-[260px]': variant !== 'promote'
      })}>
        <div className='flex flex-col justify-center container'>
          <span className='h2'>{title}</span>
          <span className='body-3 phone:body-5'>{subtitle}</span>
          {button}
        </div>
      </div>
    </ArtDirectedBackground>
  )
}

export default Banner
