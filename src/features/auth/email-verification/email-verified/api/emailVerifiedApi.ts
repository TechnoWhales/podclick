import { baseApi } from '@/shared/api/baseApi'
import { BASE_API } from '@/shared/constants'

export const EmailVerifiedApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendConfirmationEmail: build.mutation<string, string>({
      query: email => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseApi: BASE_API },
      }),
    }),
  }),
})

export const { useResendConfirmationEmailMutation } = EmailVerifiedApi
