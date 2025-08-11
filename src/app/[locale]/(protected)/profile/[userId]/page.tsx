'use client'

import { use } from 'react'

import { Posts } from '@/features/posts/ui/Posts'
import { ProfileGeneralInfo } from '@/features/profile'
import { AddPhoto } from '@/features/profile/addPhoto/ui/AddPhoto'
import { usePublicUserQuery } from '@/features/profile/profile-general-info/api/profileGeneralInfoApi'
import { useMeQuery } from '@/shared/api'
import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'

export default function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  // Распаковываем Promise
  const { userId } = use(params)
  const profileId = parseInt(userId, 10)

  // Получаем id своего профиля
  const { data: user} = useMeQuery()
  const myProfileId = user?.userId

  const {
    data: profileGeneralInfo,
    isLoading,
    isError,
  } = usePublicUserQuery({ profileId: profileId }, { skip: !profileId })

  if (isLoading) {
    return <CircleLoading />
  }

  if (isError) {
    return <div>Error loading profile data</div>
  }

  if (!profileGeneralInfo) {
    return <div>Profile not found</div>
  }

  return (
    <>
      <ProfileGeneralInfo {...profileGeneralInfo} isOwner={myProfileId === profileId} />
      <Posts userId={profileId} />
      <AddPhoto />
    </>
  )
}
