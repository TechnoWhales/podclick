import { baseApi } from '@/shared/api/baseApi'
import { ACCESS_TOKEN } from '@/shared/constants'

export const logoutApi = baseApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Me'],
      async onQueryStarted() {
        sessionStorage.removeItem(ACCESS_TOKEN)
      },
    }),
  }),
})

export const { useLogoutMutation } = logoutApi
