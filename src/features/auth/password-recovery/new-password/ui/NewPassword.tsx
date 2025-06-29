'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  useCheckRecoveryCodeMutation,
  useNewPasswordMutation,
} from '@/features/auth/password-recovery/new-password/api/newPasswordApi'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import Ring from '@/shared/components/ui/loader/ring/Ring'
import { COLORS } from '@/shared/constants'
import { NewPasswordType, useCheckCodeConfirm, useNewPasswordSchema } from '@/shared/hooks'
import { useCheckQueryParams } from '@/shared/hooks/useCheckQueryParams'

import s from './NewPassword.module.scss'

const inputMargin = '0 0 24px'

export const NewPassword = () => {
  const t = useTranslations('newPassword')
  const tCommon = useTranslations('common')
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()
  const [newPassword] = useNewPasswordMutation()
  const newPasswordSchema = useNewPasswordSchema()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  })

  const { isChecked } = useCheckQueryParams({ redirectUrl: '/' })

  const { isConfirmed } = useCheckCodeConfirm({
    confirmAction: checkRecoveryCode,
    urlPath: 'password-recovery-resending',
  })

  const onSubmit: SubmitHandler<NewPasswordType> = data => {
    if (code) {
      const body = {
        newPassword: data.password,
        recoveryCode: code,
      }

      newPassword(body)
        .unwrap()
        .then(res => {
          router.replace(`/auth/sign-in`)
        })
    }
  }

  if (!isConfirmed || !isChecked) {
    return (
      <div className={s.circularProgressContainer}>
        <Ring size={150} color={COLORS.accent['500']} />
      </div>
    )
  }

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
