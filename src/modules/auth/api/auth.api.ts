import { Api } from '@/api/axios'
import {
  UserCreatePayload,
  UserLoginPayload,
  UserLoginResponse
} from '@/modules/auth/types/authApiTypes'
export const createUser = async (
  data: UserCreatePayload
): Promise<UserLoginResponse> =>
  Api.post<UserCreatePayload, UserLoginResponse>('/users', data)

export const loginUser = async (
  data: UserLoginPayload
): Promise<UserLoginResponse> =>
  Api.post<never, UserLoginResponse>('/users/login', data)
