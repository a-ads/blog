import type { GatsbyConfig } from 'gatsby'
const resolve = require('path').resolve

const config: GatsbyConfig = {
  pathPrefix: '/blog',
  siteMetadata: {
    title:
      'AADS Crypto Blog - marketing guides, tips and news to cryptocurrencies market',
    description:
      'Crypto & Bitcoin market tips and updates, mine guides, reviews and ratings for first-timers or experienced investors, and more information of cryptocurrencies.',
    image: `static/images/favicon.ico`,
    siteUrl: 'https://aads.com',
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/assets`,
      },
      __key: 'assets',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`, // why
      },
      __key: 'pages',
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
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ['/blog/about/', '/blog/search/', '/blog/contacts/'],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cms',
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
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          quality: 100,
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['blog/about/', '/about/', 'blog/search/', '/search/', 'blog/contacts/', '/contacts/'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: `${__dirname}/static/images/favicon.svg`,
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 900,
            },
          },
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
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener nofollow',
            },
          },
        ],
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@pages': resolve(`${__dirname}/src/pages/`),
          '@ui': resolve(`${__dirname}/src/components/ui`),
          '@components': resolve(`${__dirname}/src/components`),
          '@icons': resolve(`${__dirname}/src/components/icons`),
          '@utils': resolve(`${__dirname}/src/utils`),
        },
        extensions: ['jsx, tsx, ts, css'],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: resolve(`${__dirname}/src/components/RootLayout.tsx`), // Persists layout between page changes. Auto imports layout component.
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Inter',
              variants: ['400', '500', '700'],
            },
            {
              family: 'Poppins',
              variants: ['500', '600', '700'],
            },
          ],
        },
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('tailwindcss')],
      },
    },
  ],
}

export default config
