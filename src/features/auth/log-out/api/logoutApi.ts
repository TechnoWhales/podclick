import { baseApi } from '@/shared/api/baseApi'

export const logoutApi = baseApi.injectEndpoint({
  endpoints: build => ({
    logout: build.mutation<void, void>({
      url: 'auth/logout',
      method: 'POST',
    }),
  }),
})

export const { useLogoutMutation } = logoutApi
