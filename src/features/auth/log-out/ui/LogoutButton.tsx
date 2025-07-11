'use client'
import * as React from 'react'

import { Button, Icon } from '@/shared/components/ui'
import { useAppDispatch } from '@/shared/hooks'
import { openLogoutModal } from '@/shared/model/appSlice'

import s from './LogoutButton.module.scss'

export const LogOutButton = () => {
  const dispatch = useAppDispatch()

  return (
    <Button className={s.button} variant={'icon'} onClick={() => dispatch(openLogoutModal())}>
      <Icon iconId={'logOut'} />
      Log Out
    </Button>
  )
}
