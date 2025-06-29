import { useGoogleLogin } from '@react-oauth/google'

import { useRouter } from 'next/navigation'

import { ACCESS_TOKEN, ROUTES } from '@/shared/constans'

import { useGoogleLoginMutation } from '../../api/oAuthApi'

export const useOAuth = () => {
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'popup',
    onSuccess: async credentialResponse => {
      if (credentialResponse.code) {
        try {
          const result = await googleLogin({
            redirectUrl: 'http://localhost:3000', //TODO: change url before deploy
            code: credentialResponse.code,
          }).unwrap()

          if (result.accessToken) {
            sessionStorage.setItem(ACCESS_TOKEN, result.accessToken)
            router.replace(ROUTES.HOME)
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
