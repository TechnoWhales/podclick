'use client'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { type Inputs, newPasswordSchema } from '@/features/auth/new-password/lib/schemas'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'

import s from './NewPassword.module.scss'

const inputMargin = '0 0 24px'

export const NewPassword = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      agreePolicy: false,
    },
    mode: 'onBlur',
  })

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <form>
        <div className={s.newWrapper}>
          <Typography variant={'h1'} as={'h1'}>
            Create New Password
          </Typography>
        </div>
        <TextField
          placeholder={'New password'}
          margin={errors.password?.message ? '0' : inputMargin}
          label={'New password'}
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

        <Typography variant={'small_text'} className={s.description}>
          Your password must be between 6 and 20 characters
        </Typography>

        <Button className={s.createBtn} type={'submit'} fullwidth disabled={!isValid}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
