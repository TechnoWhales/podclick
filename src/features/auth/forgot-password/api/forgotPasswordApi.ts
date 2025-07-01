import { baseApi } from '@/shared/api/baseApi'
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
          baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-password`,
        },
      }),
    }),
  }),
})

export const { usePasswordRecoveryMutation } = forgotPasswordApi
