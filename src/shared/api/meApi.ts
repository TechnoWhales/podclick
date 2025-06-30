import { baseApi } from '@/shared/api/baseApi'

type MeResponse = {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}

export const meApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => 'auth/me',
      providesTags: ['Me'],
    }),
  }),
})

export const { useMeQuery } = meApi
