'use client'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Inputs, signUpSchema } from '@/features/auth/sign-up/lib/schemas'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox'
import { Modal } from '@/shared/components/ui/modal/Modal'

import s from './SignUp.module.scss'

const inputMargin = '0 0 24px'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    reset,
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
    setEmail(data.email)
    setIsOpened(true)
    reset()
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
          margin={errors.username?.message ? '0' : inputMargin}
          label={'Username'}
          error={errors.username?.message}
          {...register('username')}
        />
        <TextField
          margin={errors.email?.message ? '0' : inputMargin}
          label={'Email'}
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          margin={errors.password?.message ? '0' : inputMargin}
          label={'Password'}
          error={errors.password?.message}
          variant={errors.password?.message ? 'horizontalBorders' : 'fullBorders'}
          mode={'password'}
          {...register('password')}
        />
        <TextField
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
              <Checkbox checked={field.value} onCheckedChangeAction={field.onChange} />
            )}
          />
          <div className={s.policyText}>
            <Typography variant={'small_text'}>I agree to the</Typography>
            <Typography variant={'small_link'} as={'a'} href={'/auth/TermsOfService'}>
              Terms of Service
            </Typography>
            <Typography variant={'small_text'}>and</Typography>
            <Typography variant={'small_link'} as={'a'} href={'/auth/PrivacyPolicy'}>
              Privacy Policy
            </Typography>
          </div>
        </div>

        <Button className={s.signUpBtn} type={'submit'} fullwidth disabled={!isValid}>
          Sign up
        </Button>
        <Typography className={s.signInTitle} variant={'regular_text_16'}>
          Do you have an account?
        </Typography>
        <Button className={s.signInBtn} as={'a'} variant={'link'} href={'/auth/sign-in'}>
          Sign In
        </Button>
      </form>
    </Card>
  )
}
