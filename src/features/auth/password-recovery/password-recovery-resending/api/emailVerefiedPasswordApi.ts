import { baseApi } from '@/shared/api/baseApi'
import { ForgotPasswordType } from '@/shared/types'

export const passwordRecoveryResendingApi = baseApi.injectEndpoints({
  endpoints: build => ({
    passwordRecoveryResending: build.mutation<void, { email: string }>({
      query: body => ({
        url: 'auth/password-recovery-resending',
        method: 'POST',
        body: {
          email: body.email,
          baseUrl: 'http://localhost:3000/auth/new-password',
        },
      }),
    }),
  }),
})

export const { usePasswordRecoveryResendingMutation } = passwordRecoveryResendingApi
