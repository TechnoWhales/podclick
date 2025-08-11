export type SortDirectionProps = 'asc' | 'desc'

export type PostIdRequest = {
  postId: number
}

export type AllPublicPostsRequest = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirectionProps
}

export type AllPublicPostsResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: PostItemsResponse[]
}

export type PublicPostsResponse = Omit<AllPublicPostsResponse, 'totalUsers'> & {
  notReadCount: number
}

export type ImagesType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type OwnerArgs = {
  firstName: string
  lastName: string
}

export type PostItemsResponse = {
  id: number
  userName: string
  description: string
  location: string
  images: ImagesType[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: OwnerArgs
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type CommentsPostRequest = {
  postId: number
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: SortDirectionProps
}

export type CommentsPostResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: CommentItems[]
}

export type CommentItems = {
  id: number
  postId: number
  from: CommentAuthor
  content: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}

export type CommentAuthor = {
  id: number
  username: string
  avatars: AvatarArgs[]
}

export type ItemPost = {
  id: number
  userId: number
  userName: string
  createdAt: string
  avatars: [
    {
      url: string
      width: number
      height: number
      fileSize: number
      createdAt: string
    },
  ]
  isFollowing: boolean
  isFollowedBy: boolean
}

export type LikesPostResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: ItemPost[]
}

//export type AvatarArgs = Record<string, unknown>;
export type AvatarArgs = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}
