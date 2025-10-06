import { baseApi } from '@/shared/api'
import { UploadAvatarResponse } from '@/shared/types'

export const avatarApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadAvatar: build.mutation<UploadAvatarResponse, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          url: 'users/profile/avatar',
          method: 'POST',
          body: formData,
        }
      },
      //invalidatesTags: ['Profile'],
    }),
    deleteAvatar: build.mutation<void, void>({
      query: () => ({
        url: 'users/profile/avatar',
        method: 'DELETE',
      }),
      //invalidatesTags: ['Profile'],
    }),
  }),
})

export const { useUploadAvatarMutation, useDeleteAvatarMutation } = avatarApi
