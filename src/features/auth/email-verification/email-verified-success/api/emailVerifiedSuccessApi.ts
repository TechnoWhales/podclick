import { baseApi } from '@/shared/api/baseApi'

export const EmailVerifiedSuccessApi = baseApi.injectEndpoints({
  endpoints: build => ({
    confirmationEmail: build.mutation<void, string>({
      query: confirmationCode => ({
        url: 'auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode },
      }),
    }),
  }),
})

export const { useConfirmationEmailMutation } = EmailVerifiedSuccessApi
