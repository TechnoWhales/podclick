'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { OAuth } from '@/features/auth'
import { useLoginMutation } from '@/features/auth/sign-in/api/signInApi'
import { Inputs, signInSchema } from '@/features/auth/sign-in/lib/schemas/signInSchema'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { ACCESS_TOKEN, ROUTES } from '@/shared/constants'
import { RTKQueryError } from '@/shared/types/Response'

import s from './SignIn.module.scss'

export const SignIn = () => {
  const [login] = useLoginMutation()
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)

    if (token) {
      router.push(ROUTES.HOME)
      router.refresh()
    }
  }, [router])

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
    login(data)
      .unwrap()
      .then(res => {
        if ('accessToken' in res) {
          sessionStorage.setItem(ACCESS_TOKEN, res?.accessToken)
        }
      })
      .catch((err: RTKQueryError) => {
        if (err.data.statusCode === 400) {
          setError('password', {
            type: 'custom',
            message: 'The email or password are incorrect. Try again please',
          })
        }
      })
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
