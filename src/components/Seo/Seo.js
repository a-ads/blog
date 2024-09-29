import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          image
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}

const Seo = props => {
  const { title, description, pathname, children, img } = props
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
  } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: img ? img : `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name='description' content={seo.description}/>
        <meta name='robots' content='max-image-preview:large'/>
        <meta name='image' content={seo.image}/>
        <meta name='twitter:card' content={seo.image}/>
        <meta name='twitter:title' content={seo.title}/>
        <meta name='twitter:url' content={seo.url}/>
        <meta name='twitter:description' content={seo.description}/>
        <meta name='twitter:image' content={seo.image}/>
      </Helmet>
      {children}
    </>
  )
}

export default Seo
