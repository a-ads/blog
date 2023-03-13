import React, { forwardRef, cloneElement } from 'react'
import cn from 'classnames'

import * as styles from './styles.module.css'
import type { DefaultProps } from '../types'

export type IconProps = {
  i: React.ReactElement
} & DefaultProps

const Icon = forwardRef(
  (
    { i, className, baseCn, ...props }: IconProps,
    ref: React.Ref<HTMLOrSVGElement>
  ) =>
    cloneElement(i, {
      className: cn(styles.icon, className, baseCn),
      ref,
      ...props,
    })
)

export default Icon
