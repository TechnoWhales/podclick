import { useGoogleLogin } from '@react-oauth/google'

import { useRouter } from 'next/navigation'

import { ACCESS_TOKEN, BASE_API, ROUTES } from '@/shared/constants'
import { useAppDispatch } from '@/shared/hooks'
import { notify } from '@/shared/lib/notify'
import { setIsLoggedIn } from '@/shared/model/appSlice'

import { useGoogleLoginMutation } from '../../api/oAuthApi'

export const useOAuth = () => {
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()
  const dispatch = useAppDispatch()

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'popup',
    onSuccess: async credentialResponse => {
      if (credentialResponse.code) {
        try {
          const result = await googleLogin({
            redirectUrl: process.env.NEXT_PUBLIC_BASE_API!,
            code: credentialResponse.code,
          }).unwrap()

          if (result.accessToken) {
            sessionStorage.setItem(ACCESS_TOKEN, result.accessToken)
            dispatch(setIsLoggedIn({ isLoggedIn: true }))
            router.replace(ROUTES.HOME)
          }
        } catch (error) {
          notify.error(`Login failed: ${(error as Error)?.message || "Google error"}`)
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
        }
      }
    },
    onError: error => {
      notify.error(`Google login failed: ${(error as Error)?.message || "Google error"}`)
    },
  })

  const loginWithGithub = () => {
    const redirectUrl = encodeURIComponent(window.location.origin + '/auth/github')

    window.location.assign(
      `${BASE_API}/auth/github/login?redirect_url=${redirectUrl}`
    )
  }

  return { loginWithGoogle, loginWithGithub }
}
