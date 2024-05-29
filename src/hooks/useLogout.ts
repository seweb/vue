import { useRouter } from 'vue-router'
import { removeItem } from '@/utils/localStorageService'
import { useStore } from 'vuex'

export function useLogout() {
  const router = useRouter()
  const store = useStore()

  const logout = async () => {
    removeItem('token')
    store.commit('SET_USER', {})
    store.commit('SET_AUTH', false)
    router.push('/')
  }

  return {
    logout
  }
}
