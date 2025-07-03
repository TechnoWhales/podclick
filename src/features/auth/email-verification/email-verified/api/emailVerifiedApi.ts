import { baseApi } from '@/shared/api/baseApi'

export const EmailVerifiedApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendConfirmationEmail: build.mutation<string, string>({
      query: email => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseApi: process.env.NEXT_PUBLIC_BASE_URL },
      }),
    }),
  }),
})

export const { useResendConfirmationEmailMutation } = EmailVerifiedApi
