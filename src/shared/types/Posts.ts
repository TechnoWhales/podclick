export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: PostImage[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: {
    firsname: string
    lastname: string
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: string | false
}

export type UserPostsResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items?: Post[]
}

export type UserPosts = UserPostsResponse & {
  hasMore: boolean
}
