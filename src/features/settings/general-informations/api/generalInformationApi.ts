import { baseApi } from '@/shared/api'
import { ProfileInformationType } from '@/shared/types'

export const generalInformationApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfileInformation: build.query<ProfileInformationType, void>({
      query: () => {
        return {
          url: 'users/profile',
          method: 'GET',
        }
      },
    }),
    uploadProfileInformation: build.mutation<void, ProfileInformationType>({
      query: body => {
        return {
          url: 'users/profile',
          method: 'PUT',
          body,
        }
      },
    }),
  }),
})

export const { useUploadProfileInformationMutation, useGetProfileInformationQuery } =
  generalInformationApi
