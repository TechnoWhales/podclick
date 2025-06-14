'use client'

import { Button } from '@/shared/components/ui'

import { useOAuth } from '../../libs/hooks'

/**
 * A button component for signing in with Github.
 * When clicked, it initiates the Github OAuth login flow.
 */

export const GithubLoginButton = () => {
  const { loginWithGithub } = useOAuth()

  return (
    <Button variant={'secondary'} onClick={() => loginWithGithub()}>
      Sign in with Github 🚀
    </Button>
  )
}
