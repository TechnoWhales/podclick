'use client'

import * as React from 'react'

import { useTranslations } from 'next-intl'

import type { SidebarLink } from '@/shared/components/sidebars/lib/types/Sidebars.types'

import { LogOutButton } from '@/features/auth'
import { usePathname } from '@/i18n/navigation'
import { SidebarsList } from '@/shared/components/sidebars/ui/sidebars/sidebars-list/SidebarsList'
import { ROUTES } from '@/shared/constants'

import s from './Sidebars.module.scss'

export const Sidebars = () => {
  const pathname = usePathname()
  const tSidebars = useTranslations('common.sidebars')

  const mainList: SidebarLink[] = [
    { name: tSidebars('feed'), href: ROUTES.FEED, iconOutline: 'homeOutline', icon: 'home' },
    { name: tSidebars('create'), href: '#', iconOutline: 'plusSquareOutline', icon: 'plusSquare' },
    { name: tSidebars('myProfile'), href: '#', iconOutline: 'personOutline', icon: 'person' },
    {
      name: tSidebars('messenger'),
      href: ROUTES.MESSAGES,
      iconOutline: 'messageCircleOutline',
      icon: 'messageCircle',
    },
    {
      name: tSidebars('search'),
      href: ROUTES.SEARCH,
      iconOutline: 'searchOutline',
      icon: 'search',
    },
  ]

  //TODO: не та иконка на bookmarkOutline

  const toolsList: SidebarLink[] = [
    {
      name: tSidebars('statistics'),
      href: ROUTES.STATS,
      iconOutline: 'trendingUpOutline',
      icon: 'trendingUp',
    },
    {
      name: tSidebars('favorites'),
      href: ROUTES.FAVORITES,
      iconOutline: 'bookmarkOutline',
      icon: 'bookmark',
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside>
      <nav className={s.nav}>
        <SidebarsList isActive={isActive} list={mainList} />
        <SidebarsList isActive={isActive} list={toolsList} />
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
