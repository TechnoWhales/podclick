'use client'

import { Button, Icon } from '@/shared/components/ui'

import { useOAuth } from '../lib/hooks'

/**
 * A button component for signing in with Google.
 * When clicked, it initiates the Google OAuth login flow.
 */

export const GoogleLoginButton = () => {
  const { loginWithGoogle } = useOAuth()

  const handleLogin = () => {
    loginWithGoogle()
  }

  return (
    <>
      <Button
        type={'button'}
        variant={'icon'}
        aria-label={'Войти через Google'}
        onClick={handleLogin}
      >
        <Icon iconId={'google'} width={'36px'} height={'36px'} />
      </Button>
    </>
  )
}
