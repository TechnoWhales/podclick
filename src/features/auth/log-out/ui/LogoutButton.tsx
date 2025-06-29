'use client'
import * as React from 'react'

import Link from 'next/link'

import { Button, Icon } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants'

import s from './LogoutButton.module.scss'

export const LogOutButton = () => {
  return (
    <div>
      <Link href={ROUTES.AUTH.LOG_OUT} passHref legacyBehavior>
        <span className={s.container}>
          <Icon iconId={'logOut'} />
          <Button className={s.size} variant="icon">
            Log Out
          </Button>
        </span>
      </Link>
    </div>
  )
}
