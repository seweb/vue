export type User = {
  username: string
  email: string
  bio: string
  token: string
  image: string
}
export type UserCreate = {
  username: string
  email: string
  password: string
}
export type UserCreatePayload = {
  user: UserCreate
}
export type UserCreateResponse = {
  data: {
    user: User
  }
}
export type UserLogin = {
  email: string
  password: string
}
export type UserLoginResponse = {
  data: {
    user: User
  }
}
export type UserLoginPayload = {
  user: UserLogin
}
export enum UserQueryKeys {
  Create = 'Create',
  Login = 'Login'
}
