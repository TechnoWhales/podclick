'use client'
import * as React from 'react'

import { useLogoutMutation } from '@/features/auth/log-out/api/logoutApi'
import { useRouter } from '@/i18n/navigation'
import { baseApi, useMeQuery } from '@/shared/api'
import { Button, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { ROUTES } from '@/shared/constants'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { closeLogoutModal, selectIsLogoutModalOpen, setIsLoggedIn } from '@/shared/model/appSlice'

import s from './Logout.module.scss'

export const LogoutModal = () => {
  const router = useRouter()
  const open = useAppSelector(selectIsLogoutModalOpen)
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const { data } = useMeQuery()
  const email = data?.email

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(baseApi.util.resetApiState())
      router.replace(ROUTES.AUTH.SIGN_IN)
    } catch (e) {
      console.error(e)
    } finally {
      dispatch(closeLogoutModal())
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeLogoutModal())}
      modalTitle={'Log Out '}
      size={'sm'}
    >
      <div className={s.modalContent}>
        <Typography variant={'regular_text_16'}>
          Are you really want to log out of your account <b>"{email}"</b> ?
        </Typography>
        <div className={s.buttonsContainer}>
          <Button variant={'outlined'} className={s.button} onClick={handleLogout}>
            Yes
          </Button>
          <Button className={s.button} onClick={() => dispatch(closeLogoutModal())}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
