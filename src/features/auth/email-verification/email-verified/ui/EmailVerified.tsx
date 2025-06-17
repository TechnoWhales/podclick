'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'

import { emailSchema, Inputs } from '@/features/auth/email-verification/email-verified/lib/schemas'
import { Button, Container, TextField, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constans'

import s from './EmailVerified.module.scss'

export const EmailVerified = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Inputs> = data => {}

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
        <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
          <Button style={{ marginBottom: '36px' }} as={'a'}>
            Resend verification link
          </Button>
        </Link>
      </form>

      <Image src={'/time-management.svg'} alt={'Time management'} width={432} height={300} />
    </Container>
  )
}
