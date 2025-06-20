import { baseApi } from '@/shared/api/baseApi'
import { BaseResponse } from '@/shared/types/Response'

export const EmailVerifiedApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendConfirmationEmail: build.mutation<BaseResponse<string>, string>({
      query: email => ({
        url: 'auth/registration-email-resending',
        method: 'POST',
        body: { email, baseApi: 'http://localhost:3000' },
      }),
    }),
  }),
})

export const { useResendConfirmationEmailMutation } = EmailVerifiedApi
