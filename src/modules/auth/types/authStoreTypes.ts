import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User } from '../types/authApiTypes'

interface AuthState {
  auth: boolean
  user: User
}

interface AuthMutations extends MutationTree<AuthState> {
  SET_USER(state: AuthState, user: User): void
  SET_AUTH(state: AuthState, auth: boolean): void
}

interface AuthActions extends ActionTree<AuthState, any> {
  // Define your actions here, if any
  //myAction(context: any, payload: any): void
}

interface AuthGetters extends GetterTree<AuthState, any> {
  getAuth(state: AuthState): boolean
  getUserData(state: AuthState): User
}

export interface AuthStore {
  state: AuthState
  mutations: AuthMutations
  actions: AuthActions
  getters: AuthGetters
}
