import { kebabCase } from 'lodash-es'

export const toCategoryLink = (
  category: CategoriesTopLevelNames,
  subcategory: CategoriesSecondLevelNames | 'all'
) => {
  return `/categories/${kebabCase(category)}/${kebabCase(subcategory)}`.replace(
    'news & trends',
    'news-trends'
  )
}
