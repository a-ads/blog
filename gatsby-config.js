module.exports = {
  siteMetadata: {
    title: 'A-ADS Blog'
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
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
      resolve: '@andrew-codes/gatsby-plugin-elasticlunr-search',
      options: {
        fields: [
          'title',
          'tags',
          'category'
        ],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            thumbnail: node => node.frontmatter.thumbnail,
            slug: node => node.fields.slug,
            category: node => node.frontmatter.category,
          },
        },
      },
    },
  ],
};
