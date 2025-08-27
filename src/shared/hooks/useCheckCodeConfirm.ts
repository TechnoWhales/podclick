'use client'
import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { useRouter } from '@/i18n/navigation'
import { emailSchema, uuidCodeSchema } from '@/shared/schemas'

type Props<T> = {
  urlPath: string
  confirmAction: (arg: T) => Promise<any>
}

export function useCheckCodeConfirm({ urlPath, confirmAction }: Props<any>) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const router = useRouter()

  useEffect(() => {
    const codeValidationResult = uuidCodeSchema.safeParse({ uuid: code })
    const emailValidationResult = emailSchema.safeParse({ email })

    if (codeValidationResult.success && code && emailValidationResult.success && email) {
      confirmAction(code).then(res => {
        if ('error' in res) {
          router.replace(`/${urlPath}?code=${code}&email=${email}`)
        } else if ('data' in res) {
          setIsConfirmed(true)
        }
      })
    }
  }, [code, email, router])

  return { isConfirmed }
}
