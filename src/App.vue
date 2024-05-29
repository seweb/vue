<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getItem } from './utils/localStorageService'
import { useGetUser } from '@/hooks/useGetUser'
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const token = getItem('token')
    useGetUser().then((user) => {
      if (token) {
        store.commit('SET_USER', user)
        store.commit('SET_AUTH', true)
      } else {
        store.commit('SET_AUTH', true)
      }
    })
  }
})
</script>
