'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { OAuth } from '@/features/auth'
import { Inputs, signInSchema } from '@/features/auth/sign-in/lib/schemas/signInSchema'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constans'

import s from './SignIn.module.scss'

const users = [
  { email: 'Epam@epam.com', password: 'Passw0rd!' },
  { email: 'user1@example.com', password: 'Test123!' },
  { email: 'user2@example.com', password: 'Password2!' },
]

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'Epam@epam.com',
      password: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    const user = users.find(user => user.email === data.email && user.password === data.password)

    if (!user) {
      setError('password', {
        type: 'manual',
        message: 'The email or password are incorrect. Try again please',
      })
    }
  }

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Sign In
      </Typography>
      <OAuth />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            placeholder={'Email'}
            variant={'fullBorders'}
            label={'Email'}
            {...register('email')}
            error={errors.email?.message}
          />
          <TextField
            placeholder={'Password'}
            variant={errors.password ? 'horizontalBorders' : 'fullBorders'}
            label={'Password'}
            mode={'password'}
            {...register('password')}
            error={errors.password?.message}
          />
        </div>
        <div className={s.containerButton}>
          <Link href={ROUTES.AUTH.FORGOT_PASSWORD} passHref legacyBehavior>
            <Typography as={'a'} className={s.forgotPasswordLink}>
              Forgot Password
            </Typography>
          </Link>

          <Button type={'submit'} variant={'primary'} disabled={!isValid} className={s.button}>
            Sign In
          </Button>
          <Typography variant={'regular_text_16'} className={s.text}>
            Don’t have an account?
          </Typography>
          <Link href={ROUTES.AUTH.SIGN_UP} passHref legacyBehavior>
            <Button variant={'link'} as={'a'}>
              Sign Up
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}
