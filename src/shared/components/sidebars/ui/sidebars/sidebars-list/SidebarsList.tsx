import * as React from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import type { SidebarLink } from '@/shared/components/sidebars/lib/types/Sidebars.types'

import { Button, Icon } from '@/shared/components/ui'

import s from './SidebarsList.module.scss'

type Props = {
  isActive: (href: string) => boolean
  list: SidebarLink[]
}
export const SidebarsList = ({ isActive, list }: Props) => {
  return (
    <ul className={s.list}>
      {list.map(i => (
        <li key={i.name}>
          <Button
            as={Link}
            href={i.href}
            variant={'link'}
            className={clsx(s.button, { [s.active]: isActive(i.href) })}
          >
            <Icon iconId={isActive(i.href) ? i.icon : i.iconOutline} />
            {i.name}
          </Button>
        </li>
      ))}
    </ul>
  )
}
