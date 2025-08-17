import { ProfileView } from '@/app/[locale]/profile/[profileId]/ProfileView'
import { BASE_API } from '@/shared/constants'

type PageProps = {
  params: Promise<{
    locale: string
    profileId: string
  }>
}

async function fetchPublicUserProfile(profileId: number) {
  const res = await fetch(`${BASE_API}/public-user/profile/${profileId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch public user count')
  }

  return res.json()
}

export default async function ProfilePage({ params }: PageProps) {
  const resolvedParams = await params
  const profileId = parseInt(resolvedParams.profileId, 10)
  const profileGeneralInfo = await fetchPublicUserProfile(profileId)

  return (
    <>
      <ProfileView profileGeneralInfo={profileGeneralInfo} profileId={profileId} />
    </>
  )
}
