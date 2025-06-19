import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { Mutex } from 'async-mutex'

export const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = sessionStorage.getItem('access-token')

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  const result = await baseQueryWithAccessToken(args, api, extraOptions)

  if (result.error?.status === 401 || result.error?.originalStatus === 401) {
    // console.log('baseQueryWithReauth: NEED REAUTH: ' + args)

    if (mutex.isLocked()) {
      await mutex.waitForUnlock()

      return baseQueryWithAccessToken(args, api, extraOptions)
    } else {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQueryWithAccessToken(
          {
            url: 'auth/update-tokens',
            method: 'POST',
            body: {},
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          sessionStorage.setItem('access-token', refreshResult.data.accessToken)

          return await baseQueryWithAccessToken(args, api, extraOptions)
        } else {
          // api.dispatch(loggedOut())
        }
      } catch (error) {
        console.error(error)
      } finally {
        release()
      }
    }
  }

  return result
}
