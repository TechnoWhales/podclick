import {
  AllPublicPostsResponse,
  CommentsPostResponse,
  LikesPostResponse,
  PostItemsResponse,
  PublicPostsResponse,
} from '@/features/public-post/api'
import { PublicPost } from '@/features/public-post/ui/PublicPost'


type Params = {
  pageSize: number
  sortBy: string
  sortDirection: string
}

type UserPostsRequest = {
  userId: number
  endCursorPostId?: number
  params?: Params
}


const getPosts = async ({ params, userId, endCursorPostId }: UserPostsRequest): Promise<AllPublicPostsResponse | null> => {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/posts/user/${userId}/${endCursorPostId}`,
    {
      cache: 'no-store',
    },
  )


  return response.json()
}

const getPost = async (postId: number): Promise<PostItemsResponse> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/id/${postId}`, {
    cache: 'no-store',
  })


  return response.json()
}

const getPostsWithPagination = async (param: string): Promise<PublicPostsResponse> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${param}`, {
    cache: 'no-store',
  })


  return response.json()
}

const getPostComments = async (postId: number): Promise<CommentsPostResponse | null> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments`, {
    cache: 'no-store',
  })


  return response.json()
}

const getPostAnswers = async (postId: number, commentId: number): Promise<PublicPostsResponse> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments/${commentId}/answers`, {
    cache: 'no-store',
  })


  return response.json()
}

const getPostAnswerLikes = async (postId: number, commentId: number, answerId: number): Promise<PublicPostsResponse> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`, {
    cache: 'no-store',
  })


  return response.json()
}


const getPostCommentLikes = async (postId: number, commentId: number): Promise<CommentsPostResponse> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments/${commentId}/likes`, {
    cache: 'no-store',
  })


  return response.json()
}

const getPostLikes = async (postId: number): Promise<LikesPostResponse> => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/likes`, {
    cache: 'no-store',
  })


  return response.json()
}

type PageProps = {
  params: Promise<{
    locale: string
    postId : string
  }>
}


export default async function PublicPage({ params }: PageProps ) {
  const resolvedParams = await params
  const postId = parseInt(resolvedParams.postId, 10)

  const [post, comments, likes] = await Promise.all([
    getPost(postId),
    getPostComments(postId),
    getPostLikes(postId),
  ])

  return (
    <div>
      <PublicPost post={post} comments={comments} likes={likes} />
    </div>
  )
}

