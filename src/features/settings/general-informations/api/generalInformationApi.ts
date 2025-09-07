import { baseApi } from '@/shared/api'

type AvatarType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: Date
}

export type ProfileInformationType = {
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: Date
  aboutMe: string
  avatars?: AvatarType[]
}

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
