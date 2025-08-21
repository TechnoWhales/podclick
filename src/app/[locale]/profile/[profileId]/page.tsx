import { ProfileView } from '@/app/[locale]/profile/[profileId]/ProfileView'
import { fetchPublicPost } from '@/features/public-post/api/publicPostApi'
import { PublicPost } from '@/features/public-post/ui/PublicPost'
import { BASE_API } from '@/shared/constants'

type PageProps = {
  params: Promise<{
    locale: string
    profileId: string
    postId?: string
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
  const postId = Number(resolvedParams.postId)

  const profileGeneralInfo = await fetchPublicUserProfile(profileId)
  const post = await fetchPublicPost.getPost(postId)
  const comments = await fetchPublicPost.getPostComments(postId)
  const likes = await fetchPublicPost.getPostLikes(postId)

  console.log(postId)

  return (
    <>
      <ProfileView profileGeneralInfo={profileGeneralInfo} profileId={profileId} postId={postId} />

      {postId && <PublicPost post={post} comments={comments} likes={likes} />}
    </>
  )
}
