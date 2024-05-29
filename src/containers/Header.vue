<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link to="/" class="nav-link">{{
            t('header.home')
          }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">{{
            t('header.signIn')
          }}</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">{{
            t('header.signUp')
          }}</router-link>
        </li>
        <template v-if="isAuth">
          <li class="nav-item">
            <router-link to="/editor" class="nav-link">{{
              t('header.newArticle')
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/settings" class="nav-link">{{
              t('header.settings')
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">{{
              t('header.profile')
            }}</router-link>
          </li>
        </template>
        <li class="nav-item">
          <ChangeLanguage />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ChangeLanguage from './ChangeLanguage.vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
export default defineComponent({
  components: { ChangeLanguage },
  name: 'Header',
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const isAuth = computed(() => store.getters.getAuth)

    console.log('store', isAuth.value)

    return { t, isAuth }
  }
})
</script>

<style lang="scss">
.router-link-exact-active {
  color: #5cb85c !important;
}
</style>
