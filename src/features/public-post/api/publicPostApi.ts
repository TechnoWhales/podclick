import {
  AllPublicPostsRequest,
  AllPublicPostsResponse,
  CommentsPostRequest,
  CommentsPostResponse,
} from '@/features/public-post/api/publicPostsApi.types'
import { baseApi } from '@/shared/api'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<AllPublicPostsResponse, AllPublicPostsRequest>({
      query: ({ userId }) => `/posts/user/${userId}`,
      // providesTags: ['Posts'],
    }),
    getComments: build.query<CommentsPostResponse, CommentsPostRequest>({
      query: ({ postId }) => `/posts/${postId}/comments`,
      // providesTags: ['Posts'],
    }),
  }),
})

export const { useGetPostsQuery, useGetCommentsQuery } = publicPostApi
