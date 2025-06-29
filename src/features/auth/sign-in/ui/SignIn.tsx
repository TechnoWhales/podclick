'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { OAuth } from '@/features/auth'
import { useLoginMutation } from '@/features/auth/sign-in/api/signInApi'
import { setIsLoggedInAC } from '@/features/auth/sign-in/app-slice'
import { Inputs, signInSchema } from '@/features/auth/sign-in/lib/schemas/signInSchema'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constans'
import { SignInType, useSignInSchema } from '@/shared/hooks'
import { ACCESS_TOKEN, ROUTES } from '@/shared/constants'
import { useAppDispatch } from '@/shared/hooks'
import { RTKQueryError } from '@/shared/types/Response'

import s from './SignIn.module.scss'

export const SignIn = () => {
  const t = useTranslations('signIn')
  const tCommon = useTranslations('common')
  const loginSchema = useSignInSchema()

  const [login] = useLoginMutation()
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)

    if (token) {
      router.push(ROUTES.HOME)
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<SignInType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
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
          router.push(ROUTES.HOME)
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
        {tCommon('button.logIn')}
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
            placeholder={tCommon('form.password.placeholder')}
            variant={errors.password ? 'horizontalBorders' : 'fullBorders'}
            label={tCommon('form.password.label')}
            mode={'password'}
            {...register('password')}
            error={errors.password?.message}
          />
        </div>
        <div className={s.containerButton}>
          <Link href={ROUTES.AUTH.FORGOT_PASSWORD} passHref legacyBehavior>
            <Typography as={'a'} className={s.forgotPasswordLink}>
              {t('forgotPassword')}
            </Typography>
          </Link>

          <Button type={'submit'} variant={'primary'} disabled={!isValid} className={s.button}>
            {tCommon('button.logIn')}
          </Button>
          <Typography variant={'regular_text_16'} className={s.text}>
            {t('noAccount')}
          </Typography>
          <Link href={ROUTES.AUTH.SIGN_UP} passHref legacyBehavior>
            <Button variant={'link'} as={'a'}>
              {tCommon('button.signUp')}
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  )
}
