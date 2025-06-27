'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useResendConfirmationEmailMutation } from '@/features/auth/email-verification/email-verified/api/emailVerifiedApi'
import { Button, Container, TextField, Typography } from '@/shared/components/ui'
import Ring from '@/shared/components/ui/loader/ring/Ring'
import { COLORS } from '@/shared/constans'
import { EmailType, useEmailSchema } from '@/shared/hooks'
import { useCheckQueryParams } from '@/shared/hooks/useCheckQueryParams'

import s from './EmailVerified.module.scss'

export const EmailVerified = () => {
  const t = useTranslations('emailVerified')
  const emailSchema = useEmailSchema()
  const [resendConfirmationEmail] = useResendConfirmationEmailMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<EmailType> = data => {
    resendConfirmationEmail(data.email)
    reset()
  }

  const { isChecked } = useCheckQueryParams({
    queryParams: ['code', 'email'],
    storeName: 'emailVerifiedParams',
  })

  if (!isChecked) {
    return (
      <div className={s.circularProgressContainer}>
        <Ring size={150} color={COLORS.accent['500']} />
      </div>
    )
  }

  return (
    <Container className={s.container} width={432} padding={'35px 0 0'}>
      <Typography variant={'h1'} className={s.title}>
        {t('title')}
      </Typography>
      <Typography className={s.description} variant={'regular_text_16'}>
        {t('description')}
      </Typography>
      <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder={'Email@gmail.com'}
          margin={errors.email?.message ? '0' : '0 0 24px'}
          label={'Email'}
          error={errors.email?.message}
          className={s.email}
          {...register('email')}
        />
        <Button style={{ marginBottom: '36px' }} type={'submit'} disabled={!isValid}>
          {t('resendLink')}
        </Button>
      </form>

      <Image src={'/time-management.svg'} alt={'Time management'} width={432} height={300} />
    </Container>
  )
}
