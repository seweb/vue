import { Api } from '@/api/axios'
import { IProfileResponse } from '@/modules/profile/types/profileApiTypes'
export const followUser = async (username: string): Promise<IProfileResponse> =>
  Api.post<never, IProfileResponse>(`profiles/${username}/follow`)

export const unFollowUser = async (
  username: string
): Promise<IProfileResponse> =>
  Api.delete<never, IProfileResponse>(`profiles/${username}/follow`)

export const getUserProfile = async (
  userName: string | string[]
): Promise<IProfileResponse> =>
  Api.get<never, IProfileResponse>(`/profiles/${userName}`)
