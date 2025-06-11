import * as TabsRadixUI from '@radix-ui/react-tabs'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Tabs.module.scss'

export type TabType = {
  disabled?: boolean
  title: string
  value: string
}

type CommonProps = {
  children?: ReactNode
  tabs: TabType[]
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<typeof TabsRadixUI.Root>

type ConditionalProps =
  | {
      fullWidth?: boolean
      variant?: 'primary'
    }
  | {
      fullWidth?: never
      variant?: 'secondary'
    }

export type TabsProps = CommonProps & ConditionalProps

export const Tabs: FC<TabsProps> = ({
  children,
  className,
  fullWidth,
  tabs,
  variant = 'primary',
  ...rest
}) => {
  const classNames = {
    list: clsx(s.list, s[variant]),
    root: clsx(s.root, className),
    trigger: clsx(s.trigger, fullWidth && s.fullWidth, s[variant]),
  }

  return (
    <TabsRadixUI.Root className={classNames.root} {...rest}>
      <TabsRadixUI.List className={classNames.list}>
        {tabs.map(tab => (
          <TabsRadixUI.Trigger
            className={classNames.trigger}
            disabled={tab.disabled}
            key={tab.value}
            value={tab.value}
          >
            {tab.title}
          </TabsRadixUI.Trigger>
        ))}
      </TabsRadixUI.List>
      {children}
    </TabsRadixUI.Root>
  )
}

export type TabContentProps = {
  children: ReactNode
  value: string
}

export const TabContent: FC<TabContentProps> = ({ children, value }) => {
  return (
    <TabsRadixUI.Content className={s.content} value={value}>
      {children}
    </TabsRadixUI.Content>
  )
}
