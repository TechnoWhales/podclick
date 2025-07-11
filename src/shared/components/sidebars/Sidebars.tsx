'use client'

import * as React from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import type { IconsId } from '@/shared/types'

import { LogOutButton } from '@/features/auth'
import { usePathname } from '@/i18n/navigation'
import { Button, Icon } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants'

import s from './Sidbars.module.scss'

type SidebarLink = {
  name: string
  href: string
  iconOutline: IconsId
  icon: IconsId
}

export const Sidebars = () => {
  const pathname = usePathname()

  const main: SidebarLink[] = [
    { name: 'Feed', href: ROUTES.FEED, iconOutline: 'homeOutline', icon: 'home' },
    { name: 'Create', href: '#', iconOutline: 'plusSquareOutline', icon: 'plusSquare' },
    { name: 'My Profile', href: '#', iconOutline: 'personOutline', icon: 'person' },
    {
      name: 'Messenger',
      href: ROUTES.MESSAGES,
      iconOutline: 'messageCircleOutline',
      icon: 'messageCircle',
    },
    { name: 'Search', href: ROUTES.SEARCH, iconOutline: 'searchOutline', icon: 'search' },
  ]

  //TODO: не та иконка на bookmarkOutline

  const tools: SidebarLink[] = [
    {
      name: 'Statistics',
      href: ROUTES.STATS,
      iconOutline: 'trendingUpOutline',
      icon: 'trendingUp',
    },
    { name: 'Favorites', href: ROUTES.FAVORITES, iconOutline: 'bookmarkOutline', icon: 'bookmark' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside>
      <nav className={s.nav}>
        <ul className={s.list}>
          {main.map(i => (
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

        <ul className={s.list}>
          {tools.map(i => (
            <li key={i.name}>
              <Button
                as={Link}
                href={i.href}
                variant={'link'}
                className={clsx(s.button, { [s.active]: isActive(i.href) })}
              >
                <Icon iconId={i.icon} />
                {i.name}
              </Button>
            </li>
          ))}
        </ul>

        <ul>
          <li>
            {/*TODO: решить вопрос с кнопкой*/}
            <LogOutButton />
          </li>
        </ul>
      </nav>
    </aside>
  )
}
