'use client'

import { useEffect } from 'react'

import { redirect, useSearchParams } from 'next/navigation'

import { useConfirmationEmailMutation } from '@/features/auth/email-verification/email-verified-success/api/emailVerifiedSuccessApi'

export default function Home() {
  const searchParams = useSearchParams()
  const [registrationConfirmation] = useConfirmationEmailMutation()
  const code = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    if (code && email) {
      registrationConfirmation(code).then(res => {
        if ('error' in res) {
          redirect('/auth/email-verified')
        } else if ('data' in res) {
          redirect('/auth/email-verified-success')
        }
      })
    }
  }, [code, email])

  return <div>Hello, TechnoWhales!</div>
}
