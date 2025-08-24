import { ProfileView } from '@/app/[locale]/profile/[profileId]/ProfileView'
import { CommentsPostResponse, LikesPostResponse, PostItemsResponse } from '@/features/public-post/api'
import { fetchPublicPost } from '@/features/public-post/api/publicPostApi'
import { PublicPost } from '@/features/public-post/ui/PublicPost'
import { BASE_API } from '@/shared/constants'

type PageProps = {
  params: Promise<{
    locale: string
    profileId: string
  }>
  searchParams: Promise<{
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

export default async function ProfilePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const profileId = parseInt(resolvedParams.profileId, 10)

  const profileGeneralInfo = await fetchPublicUserProfile(profileId)

  const { postId } = await searchParams
  const postIdNum = postId ? Number(postId) : undefined

  let post: PostItemsResponse | null = null
  let comments: CommentsPostResponse | null = null
  let likes: LikesPostResponse | null = null

  if (postIdNum) {
    post = await fetchPublicPost.getPost(postIdNum)
    comments = await fetchPublicPost.getPostComments(postIdNum)
    likes = await fetchPublicPost.getPostLikes(postIdNum)
  }

  //console.log(resolvedParams)
  //console.log(postId)

  return (
    <>
      <ProfileView
        profileGeneralInfo={profileGeneralInfo}
        profileId={profileId}
        postId={postIdNum}
      />

      {post && <PublicPost post={post} comments={comments} likes={likes} />}
    </>
  )
}
