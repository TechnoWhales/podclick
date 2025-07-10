'use client'
import * as React from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useLogoutMutation } from '@/features/auth/log-out/api/logoutApi'
import { baseApi } from '@/shared/api'
import { Button, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { ROUTES } from '@/shared/constants'
import { useAppDispatch } from '@/shared/hooks'

import s from './Logout.module.scss'

export const LogOut = () => {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(baseApi.util.resetApiState())
      router.replace(ROUTES.AUTH.SIGN_IN)
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
          <Button variant={'outlined'} className={s.button} onClick={handleLogout}>
            Yes
          </Button>
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
