'use client'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { OAuth } from '@/features/auth'
import { useRegistrationMutation } from '@/features/auth/sign-up/api/signUpApi'
import { SignUpType, useSignUnSchema } from '@/features/auth/sign-up/hooks'
import { Button, Card, TextField, Typography } from '@/shared/components/ui'
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { ROUTES } from '@/shared/constans'
import { RTKQueryError } from '@/shared/types/Response'

import s from './SignUp.module.scss'

const inputMargin = '0 0 24px'

export const SignUp = () => {
  const signUnSchema = useSignUnSchema()
  const [email, setEmail] = useState('')
  const [isOpened, setIsOpened] = useState(false)

  const tAuth = useTranslations('signUp')
  const tCommon = useTranslations('common')

  const [registration] = useRegistrationMutation()

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUnSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreePolicy: false,
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<SignUpType> = data => {
    const body = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      baseUrl: 'http://localhost:3000',
    }

    registration(body)
      .unwrap()
      .then(() => {
        setEmail(body.email)
        setIsOpened(true)
        reset()
      })
      .catch((err: RTKQueryError) => {
        if (err.data.statusCode === 400) {
          setError(err.data.messages[0].field, {
            type: 'custom',
            message: err.data.messages[0].message,
          })
        }
      })
  }

  return (
    <Card flex={'columnCenter'} className={s.card}>
      <Modal
        open={isOpened}
        onClose={() => setIsOpened(false)}
        modalTitle={tAuth('emailSent.title')}
      >
        <div>
          <Typography variant={'regular_text_16'}>
            {tAuth('emailSent.message', { email })}
          </Typography>
          <Button className={s.modalBtn} onClick={() => setIsOpened(false)}>
            {tCommon('button.ok')}
          </Button>
        </div>
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.oAuthWrapper}>
          <Typography variant={'h1'} as={'h1'}>
            {tAuth('title')}
          </Typography>
          <OAuth />
        </div>
        <TextField
          placeholder={tCommon('form.username.placeholder')}
          margin={errors.userName?.message ? '0' : inputMargin}
          label={tCommon('form.username.label')}
          error={errors.userName?.message}
          {...register('userName')}
        />
        <TextField
          placeholder={tCommon('form.email.placeholder')}
          margin={errors.email?.message ? '0' : inputMargin}
          label={tCommon('form.email.label')}
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          placeholder={tCommon('form.password.placeholder')}
          margin={errors.password?.message ? '0' : inputMargin}
          label={tCommon('form.password.label')}
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
            {tAuth.rich('policy', {
              small_text: chunks => <Typography variant={'small_text'}>{chunks}</Typography>,
              terms_of_service: chunks => (
                <Link href={ROUTES.AUTH.TERMS_OF_SERVICE} passHref legacyBehavior>
                  <Typography variant={'small_link'} as={'a'}>
                    {chunks}
                  </Typography>
                </Link>
              ),
              privacy_policy: chunks => (
                <Link href={ROUTES.AUTH.PRIVACY_POLICY} passHref legacyBehavior>
                  <Typography variant={'small_link'} as={'a'}>
                    {chunks}
                  </Typography>
                </Link>
              ),
            })}
          </div>
        </div>

        <Button className={s.signUpBtn} type={'submit'} fullwidth disabled={!isValid}>
          {tAuth('signUp')}
        </Button>
        <Typography className={s.signInTitle} variant={'regular_text_16'}>
          {tAuth('haveAccount')}
        </Typography>
        <Link href={ROUTES.AUTH.SIGN_IN} passHref legacyBehavior>
          <Button className={s.signInBtn} as={'a'} variant={'link'}>
            {tCommon('button.logIn')}
          </Button>
        </Link>
      </form>
    </Card>
  )
}
