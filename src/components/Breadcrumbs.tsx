import React from 'react'
import { isEmpty, kebabCase, capitalize } from 'lodash-es'
import cn from 'classnames'

import { Link } from '@ui'
import { withPrefix } from 'gatsby'

type BreadcrumbsProps = {
  tags: string[]
  omitCategoriesRoutePrefix?: boolean
  className?: string
  [key: string]: unknown
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  tags: t = [],
  omitCategoriesRoutePrefix,
  className,
  ...props
}) => {
  const tags = ['blog', ...t]
    .map((tag) => !isEmpty(tag) && tag)
    .flat() // Each tag is of type [string]
    .filter(Boolean) as string[]

  // Some pages like /authors don't need the "categories" route prefix
  const to = (tag: string) =>
    omitCategoriesRoutePrefix
      ? `/${kebabCase(tag)}/`
      : `/categories/${kebabCase(tag)}/`

  return (
    <nav
      className={cn('w-full mt-8 up-desktop:mt-12 phone:mt-5', className)}
      {...props}
    >
      <ul className='flex items-center flex-wrap clr-gray-4 px-0 body-3'>
        {tags.map((tag, i) => (
          <li
            key={`${tag}-${i}`}
            className='after:content-["\2022"] after:clr-gray-4 after:mx-2 after:last-of-type:hidden'
          >
            {/* First tag i === 0 is a link to the home page - blog */}
            <a
              href={i === 0 ? withPrefix('/') : withPrefix(to(tag))}
              className='hover:clr-gray-1 transition-all p-0'
            >
              {capitalize(tag)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
