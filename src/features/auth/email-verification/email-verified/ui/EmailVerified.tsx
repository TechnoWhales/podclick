'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import { useResendConfirmationEmailMutation } from '@/features/auth/email-verification/email-verified/api/emailVerifiedApi'
import { Button, Container, TextField, Typography } from '@/shared/components/ui'
import { emailSchema, EmailType } from '@/shared/schemas'

import s from './EmailVerified.module.scss'

export const EmailVerified = () => {
  const [resendConfirmationEmail] = useResendConfirmationEmailMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<EmailType> = data => {
    resendConfirmationEmail(data.email)
    reset()
  }

  return (
    <Container className={s.container} width={432}>
      <Typography variant={'h1'} style={{ marginBottom: '20px' }}>
        Email verification link expired
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.emailWrapper}>
          <TextField
            placeholder={'Email@gmail.com'}
            margin={errors.email?.message ? '0' : '0 0 24px'}
            label={'Email'}
            error={errors.email?.message}
            fullWidth
            {...register('email')}
          />
        </div>
        <Button style={{ marginBottom: '36px' }} type={'submit'} disabled={!isValid}>
          Resend verification link
        </Button>
      </form>

      <Image src={'/time-management.svg'} alt={'Time management'} width={432} height={300} />
    </Container>
  )
}
