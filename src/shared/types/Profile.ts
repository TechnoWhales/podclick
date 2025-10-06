export type AvatarType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type UploadAvatarResponse = {
  avatars: AvatarType[]
}

export type ProfileInformationType = {
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: Date
  aboutMe: string
  avatars?: AvatarType[]
}
