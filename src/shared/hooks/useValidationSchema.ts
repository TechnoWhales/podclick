'use client'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import {
  NUMBER_PATTERN,
  PASSWORD_PATTERN,
  SPECIAL_PATTERN,
  UPPERCASE_PATTERN,
  USERNAME_PATTERN,
} from '@/shared/constants/regex'

export const useSignUnSchema = () => {
  const t = useTranslations('authZodError')

  return z
    .object({
      userName: z
        .string()
        .min(1, { message: t('userName.min1') })
        .min(6, { message: t('userName.min6') })
        .max(30, { message: t('userName.max30') })
        .regex(USERNAME_PATTERN, {
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
        .regex(PASSWORD_PATTERN, {
          message: t('password.regex', {
            regexText: 'A-Z, a-z, 0-9, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
          }),
        })
        .refine(value => UPPERCASE_PATTERN.test(value), {
          message: t('password.uppercase'),
        })
        .refine(value => NUMBER_PATTERN.test(value), {
          message: t('password.number'),
        })
        .refine(value => SPECIAL_PATTERN.test(value), {
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

export const useSignInSchema = () => {
  const t = useTranslations('authZodError')

  return z.object({
    email: z
      .string()
      .min(1, { message: t('email.min1') })
      .email(t('email.email')),
    password: z
      .string()
      .min(1, { message: t('password.min1') })
      .max(20, { message: t('password.max20') })
      .regex(PASSWORD_PATTERN, {
        message: t('password.regex', {
          regexText: 'A-Z, a-z, 0-9, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
        }),
      }),
  })
}

export type SignInType = z.infer<ReturnType<typeof useSignInSchema>>

export const useEmailSchema = () => {
  const t = useTranslations('authZodError')

  return z.object({
    email: z
      .string()
      .min(1, { message: t('email.min1') })
      .email({ message: t('email.email') }),
  })
}

export type EmailType = z.infer<ReturnType<typeof useEmailSchema>>

export const useNewPasswordSchema = () => {
  const t = useTranslations('authZodError')

  return z
    .object({
      password: z
        .string()
        .min(1, { message: t('password.min1') })
        .min(6, { message: t('password.min6') })
        .max(20, { message: t('password.max20') })
        .regex(PASSWORD_PATTERN, {
          message: t('password.regex', {
            regexText: 'A-Z, a-z, 0-9, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
          }),
        })
        .refine(value => UPPERCASE_PATTERN.test(value), {
          message: t('password.uppercase'),
        })
        .refine(value => NUMBER_PATTERN.test(value), {
          message: t('password.number'),
        })
        .refine(value => SPECIAL_PATTERN.test(value), {
          message: t('password.special', {
            regexText: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
          }),
        }),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('confirmPassword'),
      path: ['confirmPassword'],
    })
}

export type NewPasswordType = z.infer<ReturnType<typeof useNewPasswordSchema>>
