export type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type ProfileResponse = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  avatars: Avatar[]
  createdAt: string
}

export type UserStatistic = {
  isFollowing?: boolean
  isFollowedBy?: boolean
  followingCount: number
  followersCount: number
  publicationsCount: number
}

export type UserResponse = ProfileResponse & UserStatistic

export type ProfileGeneralInfoType = Pick<
  ProfileResponse,
  'userName' | 'firstName' | 'lastName' | 'avatars' | 'aboutMe'
> &
  UserStatistic

export type PublicUser = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
  userMetadata: {
    following: number
    followers: number
    publications: number
  }
  hasPaymentSubscription: boolean
}
