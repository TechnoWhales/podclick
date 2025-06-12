'use client'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { Inputs, signUpSchema } from '@/features/auth/sign-up/lib/schemas'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { ROUTES } from '@/shared/constans'

import s from './SignUp.module.scss'

const mokeData = {
  username: 'test',
  email: 'test@gmail.com',
  password: 123456,
}

const inputMargin = '0 0 24px'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreePolicy: false,
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (mokeData.username === data.username) {
      setError('username', {
        type: 'custom',
        message: 'User with this username is already registered',
      })
    } else if (mokeData.email === data.email) {
      setError('email', {
        type: 'custom',
        message: 'User with this email is already registered',
      })
    } else {
      setEmail(data.email)
      setIsOpened(true)
      reset()
    }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder={'Username'}
          margin={errors.username?.message ? '0' : inputMargin}
          label={'Username'}
          error={errors.username?.message}
          {...register('username')}
        />
        <TextField
          placeholder={'Email@gmail.com'}
          margin={errors.email?.message ? '0' : inputMargin}
          label={'Email'}
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          placeholder={'Password'}
          margin={errors.password?.message ? '0' : inputMargin}
          label={'Password'}
          error={errors.password?.message}
          variant={errors.password?.message ? 'horizontalBorders' : 'fullBorders'}
          mode={'password'}
          {...register('password')}
        />
        <TextField
          placeholder={'Password confirmation'}
          margin={errors.confirmPassword?.message ? '0' : inputMargin}
          label={'Password confirmation'}
          error={errors.confirmPassword?.message}
          variant={errors.confirmPassword?.message ? 'horizontalBorders' : 'fullBorders'}
          mode={'password'}
          {...register('confirmPassword')}
        />
        <div className={s.policyWrapper}>
          <Controller
            name={'agreePolicy'}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChangeAction={value => {
                  field.onChange(value)
                  trigger('agreePolicy')
                }}
              />
            )}
          />
          <div className={s.policyText}>
            <Typography variant={'small_text'}>I agree to the</Typography>
            <Link href={ROUTES.AUTH.TERMS_OF_SERVICE} passHref legacyBehavior>
              <Typography variant={'small_link'} as={'a'}>
                Terms of Service
              </Typography>
            </Link>
            <Typography variant={'small_text'}>and</Typography>
            <Link href={ROUTES.AUTH.PRIVACY_POLICY} passHref legacyBehavior>
              <Typography variant={'small_link'} as={'a'}>
                Privacy Policy
              </Typography>
            </Link>
          </div>
        </div>

        <Button className={s.signUpBtn} type={'submit'} fullwidth disabled={!isValid}>
          Sign up
        </Button>
        <Typography className={s.signInTitle} variant={'regular_text_16'}>
          Do you have an account?
        </Typography>
        <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
          <Button className={s.signInBtn} as={'a'} variant={'link'}>
            Sign In
          </Button>
        </Link>
      </form>
    </Card>
  )
}
