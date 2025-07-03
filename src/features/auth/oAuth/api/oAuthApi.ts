import { baseApi } from '@/shared/api/baseApi'

type GoogleLoginResponse = {
  accessToken: string
  email: string
}

export const oAuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    googleLogin: build.mutation<GoogleLoginResponse, { redirectUrl: string; code: string }>({
      query: credentials => ({
        url: 'auth/google/login',
        method: 'POST',
        body: { redirectUrl: credentials.redirectUrl, code: credentials.code },
      }),
    }),
  }),
})

export const { useGoogleLoginMutation } = oAuthApi
