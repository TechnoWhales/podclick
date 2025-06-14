'use client'

import { Button, Icon } from '@/shared/components/ui'

/**
 * A button component for signing in with Github.
 * When clicked, it initiates the Github OAuth login flow.
 */

export const GithubLoginButton = () => {
  return (
    <Button variant={'icon'} aria-label={'Войти через GitHub'}>
      <Icon iconId={'github'} width={'36px'} height={'36px'} />
    </Button>
  )
}
