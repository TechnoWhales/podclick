import s from './OAuth.module.scss'

import { GithubLoginButton } from './GithubLoginButton'
import { GoogleLoginButton } from './GoogleLoginButton'

export const OAuth = () => {
  return (
    <div className={s.oauthWrapper}>
      <GoogleLoginButton />
      <GithubLoginButton />
    </div>
  )
}
