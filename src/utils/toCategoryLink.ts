import { kebabCase } from 'lodash-es'

export const toCategoryLink = (
  category: CategoriesTopLevelNames,
  subcategory: CategoriesSecondLevelNames | 'all'
) => {
  let link = ''

  if (subcategory.toLowerCase() === 'all') {
    link = `/categories/${kebabCase(category)}/`    
  } else {
    link = `/categories/${kebabCase(subcategory)}/`
  }

  return link.replace(
    'news & trends',
    'news-trends'
  )
}
