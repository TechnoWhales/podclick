// Logout.tsx
'use client'
import * as React from 'react'
import { useState } from 'react'

import { router } from 'next/client'
import Link from 'next/link'

import { useLogoutMutation } from '@/features/auth/log-out/api/logoutApi'
import { Button, Card, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { ROUTES } from '@/shared/constants'

import s from './Logout.module.scss'

type Props = {}
export const LogOut = (props: Props) => {
  const [open, setOpen] = useState(true)
  const [logout] = useLogoutMutation

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      router.replace('auth/login')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      modalTitle={'Log Out '}
      size={'sm'}
    >
      <div className={s.modalContent}>
        <Typography variant={'regular_text_16'}>
          Are you really want to log out of your account <b>"Epam@epam.com"</b> ?
        </Typography>
        <div className={s.buttonsContainer}>
          <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
            {/* Добавить логику логаута */}
            <Button variant={'outlined'} className={s.button} onclick={handleLogout}>
              Yes
            </Button>
          </Link>
          <Button
            className={s.button}
            onClick={() => {
              setOpen(false)
            }}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
