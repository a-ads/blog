const markdownFilesPath = `${__dirname}/markdown_files`

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
        path: `${__dirname}/src/`,
        name: "src",
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet'
  ]
}
