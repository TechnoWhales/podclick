import React, { ComponentPropsWithoutRef } from 'react'
import s from './Button.module.scss'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

type Props = {
  asChild?: boolean
  variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<'button'>

export const Button = ({ variant = 'primary', asChild, className, ...rest }: Props) => {
  const Component = asChild ? Slot : 'button'
  return <Component className={clsx(s.button, s[variant], className)} {...rest} />
}
