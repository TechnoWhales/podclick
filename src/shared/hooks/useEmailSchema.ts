import { useTranslations } from 'next-intl'
import { z } from 'zod'

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
