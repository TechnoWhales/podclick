'use client'

import { Button } from '@/shared/components/ui'

import { useOAuth } from '../../libs/hooks'

/**
 * A button component for signing in with Google.
 * When clicked, it initiates the Google OAuth login flow.
 */

export const GoogleLoginButton = () => {
  const { loginWithGoogle } = useOAuth()

  return <Button onClick={() => loginWithGoogle()}>Sign in with Google 🚀</Button>
}
