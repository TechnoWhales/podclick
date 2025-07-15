import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { Mutex } from 'async-mutex'

import { ACCESS_TOKEN } from '@/shared/constants'

import { handleBaseApiError } from './handleBaseApiError'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API,
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
    } catch (err) {
      console.error('Failed to refresh token:', err)
    } finally {
      release()
    }
  }

  /**
   * true, если текущий запрос — это запрос к эндпоинту "auth/me"
   */
  const isAuthMe =
    (typeof args === 'string' && args === 'auth/me') ||
    (typeof args === 'object' && args !== null && 'url' in args && (args as any).url === 'auth/me')

  // Глобальная обработка ошибок (после всех попыток)
  // Не показываем ошибку для запроса "auth/me" со статусом 401 (неавторизованный пользователь)
  if (!(result.error?.status === 401 && isAuthMe)) {
    handleBaseApiError(result)
  }

  return result
}
