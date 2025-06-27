import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useConfirmationEmailMutation } from '@/features/auth/email-verification/email-verified-success/api/emailVerifiedSuccessApi'
import { emailSchema, uuidCodeSchema } from '@/shared/schemas'

type Props = {
  code?: string | null | undefined
  email?: string | null | undefined
}

/**
 * Кастомный React-хук для валидации кода подтверждения и email,
 * а также для перенаправления пользователя в зависимости от результата валидации и ответа сервера.
 *
 * @param {Object} params - Параметры хука.
 * @param {string | null | undefined} params.code - Код подтверждения, например, полученный из URL.
 * @param {string | null | undefined} params.email - Email пользователя.
 *
 * @example
 * ```tsx
 * function Component({ code, email }) {
 *   useConfirmEmail({ code, email })
 *
 *   return <div>...</div>
 * }
 * ```
 */
export function useCheckConfirmEmail({ code, email }: Props) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [registrationConfirmation] = useConfirmationEmailMutation()
  const router = useRouter()

  useEffect(() => {
    const codeValidationResult = uuidCodeSchema.safeParse({ uuid: code })
    const emailValidationResult = emailSchema.safeParse({ email })

    if (codeValidationResult.success && code && emailValidationResult.success && email) {
      registrationConfirmation(code)
        .then(res => {
          if ('error' in res) {
            router.replace(`/auth/email-verified?code=${code}&email=${email}`)
          } else {
            router.replace(`/auth/email-verified-success?code=${code}&email=${email}`)
          }
        })
        .finally(() => {
          const emailVerifiedParams = { code, email }

          sessionStorage.setItem('emailVerifiedParams', JSON.stringify(emailVerifiedParams))
        })
    } else {
      setIsConfirmed(true)
    }
  }, [code, email, router])

  return { isConfirmed }
}
