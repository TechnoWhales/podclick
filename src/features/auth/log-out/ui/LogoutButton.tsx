'use client'
import * as React from 'react'

import { useTranslations } from 'next-intl'

import { Button, Icon } from '@/shared/components/ui'
import { useAppDispatch } from '@/shared/hooks'
import { openLogoutModal } from '@/shared/model/appSlice'

type Props = {
  className?: string
}

export const LogOutButton = ({ className }: Props) => {
  const dispatch = useAppDispatch()
  const tSidebars = useTranslations('common.sidebars')

  return (
    <Button className={className} variant={'link'} onClick={() => dispatch(openLogoutModal())}>
      <Icon iconId={'logOut'} />
      {tSidebars('logOut')}
    </Button>
  )
}
