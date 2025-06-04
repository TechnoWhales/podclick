import React, { ComponentPropsWithoutRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

import s from './Button.module.scss'

type Props = {
  as?: boolean
  fullwidth?: boolean
  variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<'button'>

export const Button = ({ variant = 'primary', as, fullwidth, className, ...rest }: Props) => {
  const Component = as ? Slot : 'button'
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
