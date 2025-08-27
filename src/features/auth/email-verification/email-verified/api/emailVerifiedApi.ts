import { baseApi } from '@/shared/api/baseApi'
import { BASE_URL } from '@/shared/constants'

export const EmailVerifiedApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendConfirmationEmail: build.mutation<string, string>({
      query: email => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseUrl: BASE_URL },
      }),
    }),
  }),
})

export const { useResendConfirmationEmailMutation } = EmailVerifiedApi
