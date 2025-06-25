import { useTranslations } from 'next-intl'
import { z } from 'zod'

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
      .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,]).{6,20}$/, {
        message: t('password.regex'),
      }),
  })
}

export type SignInType = z.infer<ReturnType<typeof useSignInSchema>>
