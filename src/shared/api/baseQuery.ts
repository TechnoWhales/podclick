import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { Mutex } from 'async-mutex'

export const SessionStorage = {
  accessToken: 'podclick-access-token',
}

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: headers => {
    const token = sessionStorage.getItem(SessionStorage.accessToken)

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
          url: 'authupdate-tokens',
          method: 'POST',
          body: {}, // при необходимости { refreshToken: "…" }
        },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        // @ts-ignore — привести к вашему типу
        sessionStorage.setItem(SessionStorage.accessToken, (refreshResult.data as any).accessToken)
        // повторяем исходный запрос
        result = await baseQuery(args, api, extraOptions)
      } else {
        // здесь можно диспачить действия logout
      }
    } catch (e) {
      console.error('Failed to refresh token:', e)
    } finally {
      release()
    }
  }

  return result
}
