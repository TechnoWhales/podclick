'use client'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import {
  forgotPasswordSchema,
  type Inputs,
} from '@/features/auth/forgot-password/lib/schemas/forgotPasswordSchema'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './ForgotPassword.module.scss'

import { ROUTES } from '../../../../shared/constants'

const mokeData = {
  email: 'test@gmail.com',
}

const inputMargin = '0 0 24px'

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [recaptchaKey, setRecaptchaKey] = useState(Date.now())

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (!recaptchaToken) {
      setError('email', {
        type: 'custom',
        message: 'Please complete the reCAPTCHA',
      })

      return
    }

    if (mokeData.email === data.email) {
      setError('email', {
        type: 'custom',
        message: "User with this email doesn't exist",
      })
    } else {
      setEmail(data.email)
      setIsOpened(true)
      setIsSubmitted(true)
      reset()
      setRecaptchaToken(null)
      setRecaptchaKey(Date.now())
    }
  }

  const handleSendAgain = () => {
    setIsSubmitted(false)
    setRecaptchaToken(null)
  }

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <Modal open={isOpened} onClose={() => setIsOpened(false)} modalTitle={'Email sent'}>
        <div>
          <Typography variant={'regular_text_16'}>
            We have sent a link to confirm your email to {email}
          </Typography>
          <Button className={s.modalBtn} onClick={() => setIsOpened(false)}>
            OK
          </Button>
        </div>
      </Modal>
      <div className={s.forgotWrapper}>
        <Typography variant={'h1'} as={'h1'}>
          Forgot password
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
          Enter your email address and we will send you further instructions
        </Typography>
        {isSubmitted ? (
          <>
            <Typography variant={'regular_text_14'}>The link has been sent by email.</Typography>
            <Typography variant={'regular_text_14'}>
              If you don’t receive an email send link again
            </Typography>
            <Button
              className={s.sendBtn}
              type={'submit'}
              fullwidth
              style={{ marginTop: '10px' }}
              onClick={handleSendAgain}
            >
              Send Link Again
            </Button>
            <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
              <Button className={s.signInBtn} as={'a'} variant={'link'}>
                Back to Sign In
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button className={s.sendBtn} type={'submit'} fullwidth>
              Send Link
            </Button>
            <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
              <Button className={s.signInBtn} as={'a'} variant={'link'}>
                Back to Sign In
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
