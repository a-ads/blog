import React, { forwardRef, useRef } from 'react'
import cn from 'classnames'

import type { DefaultProps } from '../types'
import * as styles from './styles.module.css'

export type InputProps = {
  variant?: 'contained' | 'outlined'
  prepend?: React.ReactNode
  append?: React.ReactNode
  inputCn?: string
} & DefaultProps &
  JSX.IntrinsicElements['input']

const Input = forwardRef(
  (
    {
      variant = 'outlined',
      prepend,
      append,
      children,
      className,
      baseCn,
      inputCn,
      ...props
    }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const inputRef = useRef(ref || null) as React.RefObject<HTMLInputElement>

    return (
      <div
        className={cn(styles.inputContainer, className, baseCn, {
          [styles.containedInput]: variant === 'contained',
          [styles.outlinedInput]: variant === 'outlined',
        })}
        onClick={() => inputRef?.current?.focus()}
      >
        {prepend && <div className={styles.preappend}>{prepend}</div>}
        <input
          type='text'
          className={cn(styles.input, 'body-3', inputCn)}
          autoComplete='off'
          ref={inputRef}
          {...props}
        />
        {append && <div className={styles.preappend}>{append}</div>}
      </div>
    )
  }
)

export default Input
