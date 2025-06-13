import { GithubLoginButton } from './GithubLoginButton'
import { GoogleLoginButton } from './GoogleLoginButton'

export const GoogleGithubAuth = () => {
  return (
    <>
      <br />
      <br />
      <h2>Авторизация</h2>
      <br />
      <GoogleLoginButton />
      <br />
      <hr />
      <br />
      <GithubLoginButton />
    </>
  )
}
