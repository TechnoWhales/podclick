import {
  CreatePostRequest,
  CreatePostResponse,
  FilesType,
  UploadImageResponse,
} from '@/features/profile/addPhoto/api/addPhotoType'
import { baseApi } from '@/shared/api'

export const addPhotoApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadImagesForPost: build.mutation<UploadImageResponse, FilesType>({
      query: ({ files }) => {
        const formData = new FormData()

        files.forEach(file => formData.append('file', file))

        return {
          url: 'posts/image',
          method: 'post',
          body: formData,
        }
      },
    }),
    createPost: build.mutation<CreatePostResponse, CreatePostRequest>({
      query: body => {
        return {
          url: 'posts',
          method: 'post',
          body: body,
        }
      },
    }),
  }),
})

export const { useUploadImagesForPostMutation, useCreatePostMutation } = addPhotoApi
