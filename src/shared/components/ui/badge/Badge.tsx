import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import { Button, Icon } from '@/shared/components/ui'

import s from './Badge.module.scss'

export type BadgeVariant = 'counter' | 'action'
export type BadgeIcon = 'close'

export type BadgeProps<T extends ElementType = 'div'> = {
  as?: T
  variant: BadgeVariant
  value?: number
  icon?: BadgeIcon
  className?: string
} & ComponentPropsWithoutRef<T>

export const Badge = <T extends ElementType = 'div'>(props: BadgeProps<T>) => {
  const { as: Component = 'div', variant, value = 0, icon, className, ...rest } = props

  if (variant === 'action' && icon === 'close') {
    return (
      <Button 
        variant={'icon'}
        className={clsx(s.button, s[icon], className)}
        {...rest as ComponentPropsWithoutRef<'button'>}
      >
        <span className={s.iconWrapper}>
            <Icon iconId={'close'} width={'16'} height={"16"}/>
        </span>
      </Button>
    )
  }

  return (
    <Component className={clsx(s[variant], className)} {...rest}>
        <span className={s.textWrapper}>
            {value > 99 ? '99+' : value}
        </span>
    </Component>
  )
}
