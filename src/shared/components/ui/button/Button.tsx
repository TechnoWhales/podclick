import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './Button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'
  fullwidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { variant = 'primary', fullwidth, className, as: Component = 'button', ...rest } = props
  const styles = clsx(
    s.button,
    {
      [s.fullwidth]: fullwidth,
    },
    s[variant],
    className
  )

  return <Component className={styles} {...rest} />
}
