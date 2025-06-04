'use client'

import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './Button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'
  fullwidth?: boolean
  className?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    variant = 'primary',
    fullwidth,
    disabled,
    className,
    children,
    as: Component = 'button',
    ...rest
  } = props
  const styles = clsx(
    s.button,
    {
      [s.fullwidth]: fullwidth,
      [s.disabled]: disabled,
    },
    s[variant],
    className
  )

  return (
    <Component
      className={styles}
      {...rest}
      onClick={e => {
        if (disabled) {
          e.preventDefault()
        }
      }}
    >
      {children}
    </Component>
  )
}
