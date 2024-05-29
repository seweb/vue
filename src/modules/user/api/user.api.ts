import { Api } from '@/api/axios'
import type {
  GetUserResponse,
  UpdateUserPayload,
  UpdateUserResponse
} from '@/modules/user/types/userApiTypes'

export const getUser = async () => Api.get<never, GetUserResponse>('/user')
export const updateUser = async (data: UpdateUserPayload) =>
  Api.put<never, UpdateUserResponse>('/user', data)
