function getCategoryPath(categoryName) {
  return '/categories/' + categoryName.toLowerCase()
    .replace('news & trends', 'news-trends')
    .replace(' ', '-') + '/'
}

module.exports = getCategoryPath
