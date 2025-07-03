import { baseApi } from '@/shared/api/baseApi'
import { SignInType } from '@/shared/hooks'
import { ApiErrorResponse } from '@/shared/types/Response'

export type ResponseWithAccessToken = {
  accessToken: string
}

type SignInResponse = ApiErrorResponse | ResponseWithAccessToken

export const signInApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<SignInResponse, SignInType>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = signInApi
