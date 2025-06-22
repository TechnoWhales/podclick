import { baseApi } from '@/shared/api/baseApi'

export const EmailVerifiedApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendConfirmationEmail: build.mutation<string, string>({
      query: email => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseApi: 'http://localhost:3000' },
      }),
    }),
  }),
})

export const { useResendConfirmationEmailMutation } = EmailVerifiedApi
