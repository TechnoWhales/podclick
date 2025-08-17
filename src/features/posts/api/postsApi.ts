import { baseApi } from '@/shared/api/baseApi'
import { UserPosts, UserPostsResponse } from '@/shared/types'

type Params = {
  pageSize?: number
  sortBy?: string
  sortDirection?: string
}

type UserPostsRequest = {
  userId: number
  endCursorPostId?: number
  params?: Params
}

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUserPosts: build.query<UserPostsResponse, UserPostsRequest>({
      query: ({ userId, endCursorPostId, params }) => ({
        url: `posts/user/${userId}/${endCursorPostId}`,
        params,
      }),
      providesTags: ['Posts'],
    }),
  }),
})

export const { useGetUserPostsQuery } = postsApi
