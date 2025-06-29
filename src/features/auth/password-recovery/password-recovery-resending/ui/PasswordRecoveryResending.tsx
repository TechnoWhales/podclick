'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { usePasswordRecoveryResendingMutation } from '@/features/auth/password-recovery/password-recovery-resending/api/emailVerefiedPasswordApi'
import { Button, Container, Typography } from '@/shared/components/ui'
import Ring from '@/shared/components/ui/loader/ring/Ring'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { COLORS } from '@/shared/constants'
import { useCheckQueryParams } from '@/shared/hooks/useCheckQueryParams'

import s from './PasswordRecoveryResending.module.scss'

export const PasswordRecoveryResending = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [emailForModal, setEmailForModal] = useState('')
  const t = useTranslations('passwordRecoveryResending')
  const tModal = useTranslations('forgotPassword')
  const tCommon = useTranslations('common')
  const [passwordRecoveryResending] = usePasswordRecoveryResendingMutation()
  const { isChecked } = useCheckQueryParams({ redirectUrl: '/' })
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const sendLink = () => {
    if (email) {
      setEmailForModal(email)
      passwordRecoveryResending({ email })
      setIsOpened(true)
    }
  }

  if (!isChecked) {
    return (
      <div className={s.circularProgressContainer}>
        <Ring size={150} color={COLORS.accent['500']} />
      </div>
    )
  }

  return (
    <Container className={s.container} width={432}>
      <Modal
        open={isOpened}
        onClose={() => setIsOpened(false)}
        modalTitle={tModal('emailSent.title')}
      >
        <div>
          <Typography variant={'regular_text_16'}>
            {tModal('emailSent.message', { email: emailForModal })}
          </Typography>
          <Button className={s.modalBtn} onClick={() => setIsOpened(false)}>
            {tCommon('button.ok')}
          </Button>
        </div>
      </Modal>
      <div className={s.recoveryWrapper}>
        <Typography className={s.title} variant={'h1'} style={{ marginBottom: '20px' }}>
          {t('title')}
        </Typography>
        <Typography className={s.description} variant={'regular_text_16'}>
          {t('description')}
        </Typography>

        <Button style={{ marginBottom: '36px' }} fullwidth onClick={sendLink}>
          {t('resendLink')}
        </Button>
      </div>

      <Image src={'/time-management.svg'} alt={'Time management'} width={432} height={300} />
    </Container>
  )
}
