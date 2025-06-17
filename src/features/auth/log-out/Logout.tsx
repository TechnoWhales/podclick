// Logout.tsx
'use client'
import { Button, Card, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import * as React from 'react'
import s from './Logout.module.scss'
import { useState } from 'react'

type Props = {}
export const Logout = (props: Props) => {
  const [open, setOpen] = useState(true)

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      modalTitle={'Log Out '}
      size="sm"
    >
      <div className={s.modalContent}>
        <Typography variant={'regular_text_16'}>
          Are you really want to log out of your account <b>"Epam@epam.com"</b> ?
        </Typography>
        <div className={s.buttonsContainer}>
          <Button variant="outlined" className={s.button}>
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
