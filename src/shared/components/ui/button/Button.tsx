'use client'

import React, {
  ComponentPropsWithoutRef,
  ElementType,
  type MouseEventHandler,
  ReactNode,
} from 'react'

import clsx from 'clsx'

import s from './Button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'
  fullwidth?: boolean
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    variant = 'primary',
    fullwidth,
    disabled,
    className,
    children,
    onClick,
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
    <Component className={styles} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </Component>
  )
}
