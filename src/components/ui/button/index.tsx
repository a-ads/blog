import React, { memo, forwardRef } from 'react'
import cn from 'classnames'

import type { DefaultProps } from '../types'
import * as styles from './styles.module.css'

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  text?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
} & DefaultProps &
  ComposeButtonClassnames

export type ComposeButtonClassnames = {
  className?: string
  baseCn?: string
  primary?: boolean
  secondary?: boolean
  ghost?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
}
export const composeButtonClassnames = ({
  className,
  baseCn,
  primary,
  secondary,
  ghost,
  sm,
  md = true,
  lg,
}: ComposeButtonClassnames) =>
  cn(baseCn, className, {
    [styles.btnPrimary]: primary,
    [styles.btnSecondary]: secondary,
    [styles.btnGhost]: ghost,
    [styles.btnGhost]: ghost,
    [styles.btnSm]: !ghost && sm,
    [styles.btnMd]: !ghost && md,
    [styles.btnLg]: !ghost && lg,
  })

const Button = forwardRef(
  (
    {
      type = 'button',
      text,
      children = text,
      className,
      baseCn,
      primary,
      secondary,
      ghost,
      ...props
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <button
      type={type}
      ref={ref}
      className={composeButtonClassnames({
        primary,
        secondary,
        ghost,
        className,
        baseCn,
      })}
      {...props}
    >
      {children}
    </button>
  )
)

export default memo(Button)
