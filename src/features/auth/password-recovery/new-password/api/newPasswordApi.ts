import { baseApi } from '@/shared/api/baseApi'

type NewPasswordType = {
  newPassword: string
  recoveryCode: string
}

export const newPasswordApi = baseApi.injectEndpoints({
  endpoints: build => ({
    checkRecoveryCode: build.mutation<void, { code: string }>({
      query: body => ({
        url: 'auth/check-recovery-code',
        method: 'POST',
        body: {
          recoveryCode: body,
        },
      }),
    }),
    newPassword: build.mutation<void, NewPasswordType>({
      query: body => ({
        url: 'auth/new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCheckRecoveryCodeMutation, useNewPasswordMutation } = newPasswordApi
