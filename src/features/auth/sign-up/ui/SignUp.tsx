'use client'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Inputs, signUpSchema } from '@/features/auth/sign-up/lib/schemas'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox'

import s from './SignUp.module.scss'

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: '', email: '', password: '', agreePolicy: false },
  })

  const inputMargin = '0 0 24px'

  const onSubmit: SubmitHandler<Inputs> = data => {
    debugger
  }

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin={inputMargin}
          label={'Username'}
          error={errors.username?.message}
          {...register('username')}
        />
        <TextField
          margin={inputMargin}
          label={'Email'}
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          margin={inputMargin}
          label={'Password'}
          error={errors.password?.message}
          mode={'password'}
          {...register('password')}
        />
        <TextField
          margin={inputMargin}
          label={'Password'}
          error={errors.password?.message}
          mode={'password'}
          {...register('password')}
        />
        <div className={s.policyWrapper}>
          <Controller
            name={'agreePolicy'}
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onCheckedChangeAction={field.onChange} />
            )}
          />
          <div className={s.policyText}>
            <Typography variant={'small_text'}>I agree to the</Typography>
            <Typography variant={'small_link'} as={'a'}>
              Terms of Service
            </Typography>
            <Typography variant={'small_text'}>and</Typography>
            <Typography variant={'small_link'} as={'a'}>
              Privacy Policy
            </Typography>
          </div>
        </div>
        <Button type={'submit'} fullwidth>
          Sign up
        </Button>
      </form>
    </Card>
  )
}
