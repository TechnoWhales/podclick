'use client'

import type { PublicUser } from '@/shared/types'

import { Posts } from '@/features/posts/ui/Posts'
import { ProfileGeneralInfo } from '@/features/profile'
import { AddPhoto } from '@/features/profile/addPhoto/ui/AddPhoto'
import { useMeQuery } from '@/shared/api'

type Props = {
  profileGeneralInfo: PublicUser
  profileId: number
}

export const ProfileView = ({ profileGeneralInfo, profileId}: Props) => {
  const { data: user } = useMeQuery()
  const myProfileId = user?.userId

  return (
    <>
      <ProfileGeneralInfo {...profileGeneralInfo} isOwner={myProfileId === profileId} />
      <Posts userId={profileId}/>
      <AddPhoto />
    </>
  )
}
