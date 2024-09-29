module.exports = () => {
  return {
    plugins: [
      require('postcss-url')({
        url: (asset, dir, options, decl, warn, result) => {
          if (process.env.NODE_ENV === 'production') {
            const path = require('path')
            const { pathPrefix } = require('./gatsby-config.js')
            return path.join(pathPrefix, asset.url)
          } else {
            return asset.url
          }
        },
      }),
    ],
  }
}
