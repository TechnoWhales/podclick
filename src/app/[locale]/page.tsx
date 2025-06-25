'use client'

import { useEffect } from 'react'

import { redirect, useSearchParams } from 'next/navigation'

import { useConfirmationEmailMutation } from '@/features/auth/email-verification/email-verified-success/api/emailVerifiedSuccessApi'
import ReduxProvider from '@/shared/providers/ReduxProvider'
import { emailSchema, uuidCodeSchema } from '@/shared/schemas'

export default function Home() {
  const searchParams = useSearchParams()
  const [registrationConfirmation] = useConfirmationEmailMutation()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    const codeValidationResult = uuidCodeSchema.safeParse({ uuid: code })
    const emailValidationResult = emailSchema.safeParse({ email })

    if (codeValidationResult.success && code && emailValidationResult.success && email) {
      registrationConfirmation(code).then(res => {
        if ('error' in res) {
          redirect('/auth/email-verified')
        }
      })
    }
    if (codeValidationResult.success && code && emailValidationResult.success && email) {
      redirect('/auth/email-verified-success')
    }
  }, [code, email])

  return <ReduxProvider>Hello, TechnoWhales!</ReduxProvider>
}
