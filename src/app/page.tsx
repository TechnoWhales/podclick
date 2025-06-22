'use client'

import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { useEffect } from 'react'

import { redirect, useSearchParams } from 'next/navigation'

import { useConfirmationEmailMutation } from '@/features/auth/email-verification/email-verified-success/api/emailVerifiedSuccessApi'
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
        } else {
          redirect('/auth/email-verified-success')
        }
      })
    }
  }, [code, email])

  return <div>Hello, TechnoWhales!</div>
}
