import { baseApi } from '@/shared/api/baseApi'
import { BaseResponse } from '@/shared/types/Response'

export const EmailVerifiedSuccessApi = baseApi.injectEndpoints({
  endpoints: build => ({
    confirmationEmail: build.mutation<BaseResponse<null>, string>({
      query: confirmationCode => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode },
      }),
    }),
  }),
})

export const { useConfirmationEmailMutation } = EmailVerifiedSuccessApi
