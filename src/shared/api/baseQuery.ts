import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { Mutex } from 'async-mutex'

import { ACCESS_TOKEN, BASE_API } from '@/shared/constants'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock()

      return baseQuery(args, api, extraOptions)
    }

    const release = await mutex.acquire()

    try {
      const refreshResult = await baseQuery(
        {
          url: '/auth/update-tokens',
          method: 'POST',
        },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        // @ts-ignore — привести к вашему типу
        sessionStorage.setItem(ACCESS_TOKEN, (refreshResult.data as any).accessToken)
        result = await baseQuery(args, api, extraOptions)
      } else {
        sessionStorage.removeItem(ACCESS_TOKEN)
      }
    } catch (e) {
      console.error('Failed to refresh token:', e)
    } finally {
      release()
    }
  }

  return result
}
