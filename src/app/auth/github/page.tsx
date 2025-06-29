'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Container, Typography } from '@/shared/components/ui'
import { ACCESS_TOKEN, ROUTES } from '@/shared/constans'

export default function GithubOAuthRedirectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('accessToken')
    const error = searchParams.get('error')

    if (error) {
      router.replace(ROUTES.AUTH.SIGN_UP)

      return
    }

    if (token) {
      sessionStorage.setItem(ACCESS_TOKEN, token)
      router.replace(ROUTES.HOME) //TODO: replace url
    } else {
      router.replace(ROUTES.AUTH.SIGN_UP)
    }
  }, [])

  return (
    <main style={{ color: 'white', display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
      <Container width={432}>
        <Typography style={{ textAlign: 'center' }}>Processing GitHub authentication...</Typography>
      </Container>
    </main>
  )
}
