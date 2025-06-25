import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const useSignUnSchema = () => {
  const t = useTranslations('authZodError')

  return z
    .object({
      userName: z
        .string()
        .min(1, { message: t('userName.min1') })
        .min(6, { message: t('userName.min6') })
        .max(30, { message: t('userName.max30') })
        .regex(/^[A-Za-z0-9_-]+$/, {
          message: t('userName.regex'),
        }),
      email: z
        .string()
        .min(1, { message: t('email.min1') })
        .email({ message: t('email.email') }),
      password: z
        .string()
        .min(1, { message: t('password.min1') })
        .min(6, { message: t('password.min6') })
        .max(20, { message: t('password.max20') })
        .regex(/^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/, {
          message: t('password.regex', {
            regexText: 'A-Z, a-z, 0-9, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
          }),
        })
        .refine(value => /[A-Z]/.test(value), {
          message: t('password.uppercase'),
        })
        .refine(value => /[0-9]/.test(value), {
          message: t('password.number'),
        })
        .refine(value => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value), {
          message: t('password.special', {
            regexText: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
          }),
        }),
      confirmPassword: z.string(),
      agreePolicy: z.boolean().refine(val => val === true),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('confirmPassword'),
      path: ['confirmPassword'],
    })
}

export type SignUpType = z.infer<ReturnType<typeof useSignUnSchema>>
