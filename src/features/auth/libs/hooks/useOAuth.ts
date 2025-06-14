import { useGoogleLogin } from '@react-oauth/google'

import { useGoogleLoginMutation } from '../../api/authApi'

export const useOAuth = () => {
  const [googleLogin] = useGoogleLoginMutation()

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async credentialResponse => {
      if (credentialResponse.code) {
        try {
          const result = await googleLogin({
            redirectUrl: 'http://localhost:3000',
            code: credentialResponse.code,
          }).unwrap()

          if (result.accessToken) {
            sessionStorage.setItem('access-token', result.accessToken)
          }
        } catch (error) {
          console.error('Login failed:', error)
        }
      }
    },
    onError: error => {
      console.error('Google login failed:', error)
    },
  })

  const loginWithGithub = () => {
    const redirectUrl = encodeURIComponent(window.location.origin + '/auth/')

    window.location.assign(
      `https://inctagram.work/api/v1/auth/github/login?redirect_url=${redirectUrl}`
    )
  }

  return { loginWithGoogle, loginWithGithub }
}
