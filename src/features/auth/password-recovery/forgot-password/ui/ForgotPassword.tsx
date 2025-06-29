'use client'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { usePasswordRecoveryMutation } from '@/features/auth/password-recovery/forgot-password/api/forgotPasswordApi'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { ROUTES } from '@/shared/constants'
import { EmailType, useEmailSchema } from '@/shared/hooks'
import { RTKQueryError } from '@/shared/types'

import s from './ForgotPassword.module.scss'

const inputMargin = '0 0 24px'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [recaptchaKey, setRecaptchaKey] = useState(Date.now())
  const emailSchema = useEmailSchema()
  const t = useTranslations('forgotPassword')
  const tCommon = useTranslations('common')
  const [passwordRecovery] = usePasswordRecoveryMutation()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<EmailType> = data => {
    if (!recaptchaToken) {
      setError('email', {
        type: 'custom',
        message: 'Please complete the reCAPTCHA',
      })

      return
    }

    const body = {
      email: data.email,
      recaptcha: recaptchaToken,
    }

    passwordRecovery(body)
      .unwrap()
      .then(res => {
        setEmail(body.email)
        setIsOpened(true)
        setIsSubmitted(true)
        reset()
      })
      .catch((err: RTKQueryError) => {
        if (err.data.statusCode === 400 && err.data.messages[0].field === 'email') {
          setError(err.data.messages[0].field, {
            type: 'custom',
            message: err.data.messages[0].message,
          })
        }
      })
  }

  const handleSendAgain = () => {
    if (recaptchaToken) {
      const body = {
        email,
        recaptcha: recaptchaToken,
      }

      passwordRecovery(body)
        .unwrap()
        .then(() => {
          setEmail(body.email)
          setIsOpened(true)
          setIsSubmitted(true)
          setIsSubmitted(false)
          setRecaptchaToken(null)
          setRecaptchaKey(Date.now())
          reset()
        })
    }
  }

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <Modal open={isOpened} onClose={() => setIsOpened(false)} modalTitle={t('emailSent.title')}>
        <div>
          <Typography variant={'regular_text_16'}>{t('emailSent.message', { email })}</Typography>
          <Button className={s.modalBtn} onClick={() => setIsOpened(false)}>
            {tCommon('button.ok')}
          </Button>
        </div>
      </Modal>
      <div className={s.forgotWrapper}>
        <Typography variant={'h1'} as={'h1'}>
          {t('title')}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder={'Email@gmail.com'}
          margin={errors.email?.message ? '0' : inputMargin}
          label={'Email'}
          error={errors.email?.message}
          {...register('email')}
        />
        <Typography variant={'regular_text_14'} className={s.text}>
          {t('description')}
        </Typography>
        {isSubmitted ? (
          <>
            <Typography variant={'regular_text_14'}>{t('emailLinkSent')}</Typography>
            <Typography variant={'regular_text_14'}>{t('emailLinkSentDescription')}</Typography>
            <Button
              className={s.sendBtn}
              fullwidth
              type={'button'}
              style={{ marginTop: '10px' }}
              onClick={handleSendAgain}
            >
              {t('sendLinkAgain')}
            </Button>
            <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
              <Button className={s.signInBtn} as={'a'} variant={'link'}>
                {t('backToSignIn')}
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button className={s.sendBtn} type={'submit'} fullwidth>
              {t('sendLink')}
            </Button>
            <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
              <Button className={s.signInBtn} as={'a'} variant={'link'}>
                {t('backToSignIn')}
              </Button>
            </Link>
            <div className={s.recaptcha}>
              <ReCAPTCHA
                key={recaptchaKey}
                size={'normal'}
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY as string}
                onChange={token => {
                  setRecaptchaToken(token)
                }}
                theme={'dark'}
              />
            </div>
          </>
        )}
      </form>
    </Card>
  )
}
