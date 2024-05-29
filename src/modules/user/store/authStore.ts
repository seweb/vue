import { AuthStore } from '../types/authStoreTypes'
import { User } from '../types/authApiTypes'

const authStore: AuthStore = {
  state: {
    auth: false,
    user: {} as User
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.auth = true
    },
    SET_AUTH(state, auth) {
      state.auth = true
    }
  },
  actions: {},
  getters: {
    getAuth(state) {
      return state.auth
    }
  }
}

export default authStore
