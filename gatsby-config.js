module.exports = {
  siteMetadata: {
    baseTitle: 'Test title'
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: "blog",
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet'
  ]
}