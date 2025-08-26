import {
  AllPublicPostsRequest,
  AllPublicPostsResponse,
  CommentsPostRequest,
  CommentsPostResponse,
  LikesPostResponse,
  PostItemsResponse,
} from '@/features/public-post/api/publicPostsApi.types'
import { baseApi } from '@/shared/api'
import { BASE_API } from '@/shared/constants'

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
    changePostDescription: build.mutation<any, { description: string; postId: number }>({
      query: ({ description, postId }) => {
        return {
          url: `/posts/${postId}`,
          method: 'put',
          body: { description },
        }
      },
    }),
    removePost: build.mutation<any, { postId: number }>({
      query: ({ postId }) => {
        return {
          url: `/posts/${postId}`,
          method: 'delete',
        }
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetCommentsQuery,
  useChangePostDescriptionMutation,
  useRemovePostMutation,
} = publicPostApi

export const fetchPublicPost = {
  getPost: async (postId: number): Promise<PostItemsResponse> => {
    const response = await fetch(`${BASE_API}/posts/id/${postId}`, {
      cache: 'no-store',
    })

    return response.json()
  },

  getPostComments: async (postId: number): Promise<CommentsPostResponse | null> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments`, {
      cache: 'no-store',
    })

    return response.json()
  },

  getPostLikes: async (postId: number): Promise<LikesPostResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/likes`, {
      cache: 'no-store',
    })

    return response.json()
  },
}
