import React, { ComponentPropsWithoutRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

import s from './Button.module.scss'

type Props = {
  as?: boolean
  variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<'button'>

export const Button = ({ variant = 'primary', as, className, ...rest }: Props) => {
  const Component = as ? Slot : 'button'

  return <Component className={clsx(s.button, s[variant], className)} {...rest} />
}
