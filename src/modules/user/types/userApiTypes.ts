export type User = {
  username: string
  email: string
  bio: string
  token?: string
  image: string
  password?: string
}

export type GetUserResponse = {
  data: {
    user: User
  }
}

export type UpdateUserPayload = {
  user: User
}

export type UpdateUserResponse = {
  data: {
    user: User
  }
}

export enum UserQueryKeys {
  Get = 'Get'
}
