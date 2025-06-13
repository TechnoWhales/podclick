'use client'

import { useGoogleLogin } from '@react-oauth/google'

import { useGoogleLoginMutation } from '@/features/auth/api/authApi'
import { Button } from '@/shared/components/ui'

/**
 * A button component for signing in with Google.
 * When clicked, it initiates the Google OAuth login flow.
 */

export const GoogleLoginButton = () => {
  const [googleLogin] = useGoogleLoginMutation()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async credentialResponse => {
      //console.log('Google login success')
      console.log(credentialResponse)

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

  return <Button onClick={() => login()}>Sign in with Google 🚀</Button>
}
