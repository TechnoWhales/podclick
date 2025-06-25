import type { ZodErrorMap } from 'zod'

import { defaultErrorMap, ZodIssueCode, ZodParsedType } from 'zod'
import { useFormatter, useTranslations } from 'next-intl'

const jsonStringifyReplacer = (_: string, value: any): any => {
  if (typeof value === 'bigint') {
    return value.toString()
  }

  return value
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  for (const key in value) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }

  return true
}

const getKeyAndValues = (
  param: unknown,
  defaultKey: string
): {
  values: Record<string, unknown>
  key: string
} => {
  if (typeof param === 'string') {
    return { key: param, values: {} }
  }

  if (isRecord(param)) {
    const key = 'key' in param && typeof param.key === 'string' ? param.key : defaultKey
    const values = 'values' in param && isRecord(param.values) ? param.values : {}

    return { key, values }
  }

  return { key: defaultKey, values: {} }
}

export type MakeZodI18nMapForAuth = (option?: ZodI18nMapOption) => ZodErrorMap

export type ZodI18nMapOption = {
  t?: any
  ns?: string | readonly string[]
  handlePath?: HandlePathOption | false
}

export type HandlePathOption = {
  context?: string
  ns?: string | readonly string[]
  keyPrefix?: string
}

const defaultNs = 'authZodError'

export const useMakeZodI18nMapForAuth: MakeZodI18nMapForAuth = option => {
  const translations = useTranslations(defaultNs)
  const format = useFormatter()

  return (issue, ctx) => {
    const { t, ns, handlePath } = {
      t: translations,
      ns: defaultNs,
      ...option,
      handlePath:
        option?.handlePath !== false
          ? {
              context: 'with_path',
              ns: option?.ns ?? defaultNs,
              keyPrefix: undefined,
              ...option?.handlePath,
            }
          : null,
    }

    let message: string

    message = defaultErrorMap(issue, ctx).message

    const path =
      issue.path.length > 0 && !!handlePath
        ? {
            context: handlePath.context,
            path: t([handlePath.keyPrefix, issue.path.join('.')].filter(Boolean).join('.'), {
              defaultValue: issue.path.join('.'),
            }),
          }
        : {}
    const field = issue.path[0] ?? ''

    switch (issue.code) {
      case ZodIssueCode.too_small: // .min
        if (field === 'userName' && issue.minimum === 1) {
          return { message: t('userName.min1', { min: issue.minimum }) }
        } else if (field === 'userName' && issue.minimum === 6) {
          return { message: t('userName.min6', { min: issue.minimum }) }
        }
        if (field === 'email' && issue.minimum === 1) {
          return { message: t('email.min1') }
        }
        if (field === 'password' && issue.minimum === 1) {
          return { message: t('password.min1', { min: issue.minimum }) }
        } else if (field === 'password' && issue.minimum === 6) {
          return { message: t('password.min6', { min: issue.minimum }) }
        }
        return { message: t('testError', { min: issue.minimum }) }

      case ZodIssueCode.too_big: // .max
        if (field === 'userName' && issue.maximum === 30) {
          return { message: t('userName.max30', { max: issue.maximum }) }
        }
        if (field === 'password' && issue.maximum === 20) {
          return { message: t('password.max20', { max: issue.maximum }) }
        }
        return { message: t('testError', { max: issue.maximum }) }

      case ZodIssueCode.invalid_string: // .regex or .email
        if (issue.validation === 'regex' && field === 'userName') {
          return { message: t('userName.regex') }
        }
        if (issue.validation === 'regex' && field === 'password') {
          return { message: t('password.regex') }
        }
        if (issue.validation === 'email' && field === 'email') {
          return { message: t('email.email') }
        }

        return { message: t('testError') }

      case ZodIssueCode.invalid_type: // .boolean
        if (field === 'agreePolicy') {
          return { message: t('agreePolicy.required') }
        }
        return { message: t('common.invalidType') }

      case ZodIssueCode.invalid_enum_value:
        return { message: t('common.invalidEnum') }

      case ZodIssueCode.unrecognized_keys:
        return { message: t('common.unrecognizedKeys') }

      case ZodIssueCode.custom: // customs or refine
        if (field === 'password') {
          if (issue.params?.typeError === 'uppercase') {
            return { message: t('password.uppercase') }
          }

          if (issue.params?.typeError === 'number') {
            return { message: t('password.number') }
          }

          if (issue.params?.typeError === 'special') {
            return { message: t('password.special') }
          }
        }

        if (typeof issue.message === 'string' && issue.message.startsWith('password.')) {
          return { message: t(issue.message) }
        }

        if (field === 'confirmPassword') {
          return { message: t('confirmPassword') }
        }
        if (field === 'agreePolicy') {
          return { message: t('agreePolicy.required') }
        }
        return { message: t('common.custom') }

      case ZodIssueCode.invalid_union:
        return { message: t('common.invalidUnion') }

      case ZodIssueCode.invalid_literal:
        return { message: t('common.invalidLiteral') }

      case ZodIssueCode.invalid_arguments:
      case ZodIssueCode.invalid_return_type:
      case ZodIssueCode.not_multiple_of:
      default:
        return { message: ctx.defaultError }
    }

    return { message }
  }
}
