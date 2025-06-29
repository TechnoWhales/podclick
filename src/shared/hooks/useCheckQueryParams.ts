'use client'
import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { emailSchema, uuidCodeSchema } from '@/shared/schemas'

type Props = {
  redirectUrl?: string
}

export const useCheckQueryParams = ({ redirectUrl = '/' }: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    const codeValidationResult = uuidCodeSchema.safeParse({ uuid: code })
    const emailValidationResult = emailSchema.safeParse({ email })

    if (codeValidationResult.success && code && emailValidationResult.success && email) {
      setIsChecked(true)
    } else {
      router.replace(redirectUrl)
    }
  }, [code, email, router])

  return { isChecked }
}
