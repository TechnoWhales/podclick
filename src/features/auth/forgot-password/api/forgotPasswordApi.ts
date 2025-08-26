import { baseApi } from '@/shared/api/baseApi'
import { BASE_URL } from '@/shared/constants'
import { ForgotPasswordType } from '@/shared/types'

export const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: build => ({
    passwordRecovery: build.mutation<void, ForgotPasswordType>({
      query: body => ({
        url: 'auth/password-recovery',
        method: 'POST',
        body: {
          email: body.email,
          recaptcha: body.recaptcha,
          baseUrl: `${BASE_URL}/auth/new-password`,
        },
      }),
    }),
  }),
})

export const { usePasswordRecoveryMutation } = forgotPasswordApi
