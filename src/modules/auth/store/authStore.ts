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
    SET_AUTH(state, value) {
      state.auth = value
    }
  },
  actions: {},
  getters: {
    getAuth(state) {
      return state.auth
    },
    getUserData(state) {
      return state.user
    }
  }
}

export default authStore
