import { getUser } from '@/modules/user/api/user.api'
import { User } from '@/modules/user/types/userApiTypes'
import { toast } from 'vue3-toastify'

export async function useGetUser(): Promise<User | null> {
  try {
    const {
      data: { user }
    } = await getUser()
    return user
  } catch (error) {
    toast.error('Something went wrong')
    return null
  }
}
