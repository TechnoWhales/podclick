'use client'
import * as React from 'react'

import { useTranslations } from 'next-intl'

import { Button, Icon } from '@/shared/components/ui'
import { useAppDispatch } from '@/shared/hooks'
import { openLogoutModal } from '@/shared/model/appSlice'

import s from './LogoutButton.module.scss'

export const LogOutButton = () => {
  const dispatch = useAppDispatch()
  const tSidebars = useTranslations('common.sidebars')

  return (
    <Button className={s.button} variant={'link'} onClick={() => dispatch(openLogoutModal())}>
      <Icon iconId={'logOut'} />
      {tSidebars('logOut')}
    </Button>
  )
}
