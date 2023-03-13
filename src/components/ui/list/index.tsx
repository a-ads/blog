import React, { forwardRef } from 'react'
import cn from 'classnames'

import * as styles from './styles.module.css'
import type { DefaultProps } from '../types'

export type ListItemProps = {
  text?: string
} & DefaultProps

const ListItem = forwardRef(
  (
    { text, children = text, className, baseCn, ...props }: ListItemProps,
    ref: React.Ref<HTMLLIElement>
  ) => (
    <li className={cn(className, baseCn)} ref={ref} {...props}>
      {children}
    </li>
  )
)

export type ListProps = {
  bulleted?: boolean
} & DefaultProps

const List = forwardRef(
  (
    { children, className, baseCn, bulleted, ...props }: ListProps,
    ref: React.Ref<HTMLUListElement>
  ) => (
    <ul
      className={cn(styles.list, className, baseCn, {
        [styles.bulleted]: bulleted,
      })}
      ref={ref}
      {...props}
    >
      {children}
    </ul>
  )
)

export { List, ListItem }
