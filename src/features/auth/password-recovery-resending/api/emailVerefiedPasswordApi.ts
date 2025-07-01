import { baseApi } from '@/shared/api/baseApi'

export const passwordRecoveryResendingApi = baseApi.injectEndpoints({
  endpoints: build => ({
    passwordRecoveryResending: build.mutation<void, { email: string }>({
      query: body => ({
        url: 'auth/password-recovery-resending',
        method: 'POST',
        body: {
          email: body.email,
          baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-password`,
        },
      }),
    }),
  }),
})

export const { usePasswordRecoveryResendingMutation } = passwordRecoveryResendingApi
