module.exports = {
  pathPrefix: '/blog',
  siteMetadata: {
    title: 'A-ADS Blog',
    siteUrl: 'https://a-ads.com'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        enableIdentityWidget: false,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: "content",
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [
          { name: 'en' }
        ],
        fields: [
          { name: 'title', store: true },
          { name: 'tags', store: false },
          { name: 'category', store: true },
          { name: 'slug', store: true },
          { name: 'thumbnail', store: true}
        ],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            thumbnail: node => node.frontmatter.thumbnail,
            slug: node => node.fields.slug,
            category: node => node.frontmatter.category,
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-2973328-17',
        head: true,
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      }
    }
  ],
};
