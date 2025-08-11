import { baseApi } from '@/shared/api/baseApi'
import { PublicUser } from '@/shared/types'

export const ProfileGeneralInfoApi = baseApi.injectEndpoints({
  endpoints: build => ({
    publicUser: build.query<PublicUser, {profileId: number}>({
      query: ({profileId}) => `public-user/profile/${profileId}`
    })
  }),
})

export const { usePublicUserQuery } = ProfileGeneralInfoApi
