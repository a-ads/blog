const R = require('ramda')

const toKebabCase = R.pipe(
  R.toLower,
  R.replace(/\s+/g, '-'),
  R.replace(/&/g, '-')
)

module.exports = toKebabCase
