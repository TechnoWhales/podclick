'use client'

import { Button } from '@/shared/components/ui'

/**
 * A button component for signing in with Github.
 * When clicked, it initiates the Github OAuth login flow.
 */

export const GithubLoginButton = () => {
  const redirectUrl = encodeURIComponent(window.location.origin + '/auth/')

  // eslint-disable-next-line no-console
  console.log(redirectUrl)

  return (
    <Button
      variant={'secondary'}
      onClick={() =>
        window.location.assign(
          // `https://inctagram.work/api/v1/auth/github/login?redirect_url=http://localhost:3000`
          `https://inctagram.work/api/v1/auth/github/login?redirect_url=${redirectUrl}`
        )
      }
    >
      Sign in with Github 🚀
    </Button>
  )
}
