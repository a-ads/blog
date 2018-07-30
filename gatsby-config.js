const markdownFilesPath = `${__dirname}/content`

module.exports = {
  siteMetadata: {
    title: 'A-ADS Blog'
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${markdownFilesPath}/blog/`,
        name: "blog",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${markdownFilesPath}/blog_categories/`,
        name: "blog_categories",
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
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
  ],
};
