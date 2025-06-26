'use client'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'

import {
  type NewPasswordType,
  useNewPasswordSchema,
} from '@/features/auth/new-password/lib/schemas'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'

import s from './NewPassword.module.scss'

const inputMargin = '0 0 24px'

export const NewPassword = () => {
  const t = useTranslations('newPassword')
  const tCommon = useTranslations('common')
  const newPasswordSchema = useNewPasswordSchema()
  const {
    register,
    formState: { errors, isValid },
  } = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  })

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <form>
        <div className={s.newWrapper}>
          <Typography variant={'h1'} as={'h1'}>
            {t('title')}
          </Typography>
        </div>
        <TextField
          placeholder={t('newPassword')}
          margin={errors.password?.message ? '0' : inputMargin}
          label={t('newPassword')}
          error={errors.password?.message}
          variant={errors.password?.message ? 'horizontalBorders' : 'fullBorders'}
          mode={'password'}
          {...register('password')}
        />
        <TextField
          placeholder={tCommon('form.confirmPassword.placeholder')}
          margin={errors.confirmPassword?.message ? '0' : inputMargin}
          label={tCommon('form.confirmPassword.label')}
          error={errors.confirmPassword?.message}
          variant={errors.confirmPassword?.message ? 'horizontalBorders' : 'fullBorders'}
          mode={'password'}
          {...register('confirmPassword')}
        />

        <Typography variant={'small_text'} className={s.description}>
          {t('description')}
        </Typography>

        <Button className={s.createBtn} type={'submit'} fullwidth disabled={!isValid}>
          {t('createNewPassword')}
        </Button>
      </form>
    </Card>
  )
}
