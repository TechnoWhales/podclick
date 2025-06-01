import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './Typography.module.scss'

export type TypographyVariant =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'regular_text_16'
  | 'bold_text_16'
  | 'regular_text_14'
  | 'medium_text_14'
  | 'bold_text_14'
  | 'small_text'
  | 'semibold_small_text'
  | 'regular_link'
  | 'small_link'
  | 'error'
  | 'caption'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  variant?: TypographyVariant
  className?: string
  color?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const { variant = 'regular_text_14', className = '', as: Component = 'p', ...rest } = props

  return <Component className={`${s[variant]} ${className}`} {...rest} />
}
