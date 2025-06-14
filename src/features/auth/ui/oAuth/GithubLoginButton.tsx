'use client'

import { Button, Icon } from '@/shared/components/ui'

import { useOAuth } from '../../libs/hooks'

/**
 * A button component for signing in with Github.
 * When clicked, it initiates the Github OAuth login flow.
 */

export const GithubLoginButton = () => {
  const { loginWithGithub } = useOAuth()

  return (
    <Button variant={'icon'} aria-label={'Войти через GitHub'} onClick={() => loginWithGithub()}>
      <Icon iconId={'github'} width={'36px'} height={'36px'} />
    </Button>
  )
}
