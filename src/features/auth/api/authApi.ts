import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithAccessToken } from '@/store/base-query-with-access-token'

import { GoogleLoginResponse } from './authApi.types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    googleLogin: builder.mutation<GoogleLoginResponse, { redirectUrl: string; code: string }>({
      query: credentials => ({
        url: 'v1/auth/google/login',
        method: 'POST',
        body: { redirectUrl: credentials.redirectUrl, code: credentials.code },
      }),
    }),
  }),
})

export const { useGoogleLoginMutation } = authApi
