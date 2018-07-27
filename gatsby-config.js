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
