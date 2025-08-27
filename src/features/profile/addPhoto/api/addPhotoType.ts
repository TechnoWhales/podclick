export type FilesType = {
  files: File[]
}

export type ImageType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type UploadImageResponse = {
  images: ImageType[]
}

export type UploadIdType = { uploadId: string }

export type CreatePostRequest = {
  description: string
  childrenMetadata: UploadIdType[]
}

export type OwnerType = {
  firstName: string
  lastName: string
}

export type CreatePostResponse = {
  id: number
  userName: string
  description: string
  location: string
  images: ImageType[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: OwnerType
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}
