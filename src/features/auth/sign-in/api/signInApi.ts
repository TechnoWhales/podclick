import { Inputs } from '@/features/auth/sign-in/lib/schemas'
import { baseApi } from '@/shared/api/baseApi'
import { ApiErrorResponse } from '@/shared/types/Response'

export type ResponseWithAccessToken = {
  accessToken: string
}

type SignInResponse = ApiErrorResponse | ResponseWithAccessToken

export const signInApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<SignInResponse, Inputs>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = signInApi
