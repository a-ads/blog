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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-mdx',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
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
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter\:400,700`,
          `Poppins\:400,700`,
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
