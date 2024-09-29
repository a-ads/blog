/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title:
      'AADS Crypto Blog - marketing guides, tips and news to cryptocurrencies market',
    description:
      'Crypto & Bitcoin market tips and updates, mine guides, reviews and ratings for first-timers or experienced investors, and more information of cryptocurrencies.',
    image: `static/images/favicon.ico`,
    siteUrl: 'https://aads.com',
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['GTM-WGWBHFS'],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          delayOnRouteUpdate: 100,
        },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://aads.com/blog/`,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['/search/', '/blog/search/'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: `${__dirname}/static/images/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: 'toc-gatsby-config',
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener nofollow',
            },
          },
          'gatsby-remark-reading-time'
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter\:400,500,600,700`,
          `Poppins\:400,500,600,700`,
          `Noto Sans\:400,700`,
        ],
        display: 'swap'
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./static/assets/"
      },
      __key: "assets"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
    },
    __key: "pages"
    },
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
      __key: 'content',
    },
    {
      resolve: 'gatsby-remark-external-links',
      options: {
        target: '_blank',
        rel: 'noopener nofollow',
      },
    },
  ]
}
