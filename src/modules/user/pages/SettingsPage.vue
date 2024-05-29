<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ t('user.yourSettings') }}</h1>

          <ErrorsList :errors="serverErrors" />

          <form @submit.prevent="handleSubmit">
            <InputItem
              class="form-control form-control-lg"
              type="text"
              :placeholder="t('user.picture')"
              :errorMessage="handleClientErrors(v$, 'image')"
              v-model="inputs.image"
            />
            <InputItem
              class="form-control form-control-lg"
              type="text"
              :placeholder="t('user.name')"
              :errorMessage="handleClientErrors(v$, 'username')"
              v-model="inputs.username"
            />
            <TextArea
              class="form-control form-control-lg"
              :placeholder="t('user.bio')"
              :rows="8"
              :errorMessage="handleClientErrors(v$, 'bio')"
              v-model="inputs.bio"
            />
            <InputItem
              class="form-control form-control-lg"
              type="text"
              :placeholder="t('user.email')"
              :errorMessage="handleClientErrors(v$, 'email')"
              v-model="inputs.email"
            />
            <InputItem
              class="form-control form-control-lg"
              type="text"
              :placeholder="t('user.newPassword')"
              :errorMessage="handleClientErrors(v$, 'password')"
              v-model="inputs.password"
            />
            <Button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              :disabled="false"
              :text="t('user.updateSettings')"
              :isLoading="isLoading"
              @submit="handleSubmit"
            />
          </form>
          <hr />
          <Button
            type="button"
            class="btn btn-outline-danger"
            :text="t('user.logout')"
            :isLoading="isLoading"
            @click="handleLogout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { InputsData } from '../types/settingsFormTypes'
import { ServerErrorsType } from '@/types/apiTypes'
import { useVuelidate } from '@vuelidate/core'
import { getUser, updateUser } from '../api/user.api'
import { required, email } from '@vuelidate/validators'
import { handleClientErrors } from '@/hooks/handleErrors'
import ErrorsList from '@/components/ErrorsList.vue'
import InputItem from '@/components/InputItem.vue'
import TextArea from '@/components/TextArea.vue'
import Button from '@/components/Button.vue'
import { useLogout } from '@/hooks/useLogout'
import { useStore } from 'vuex'
import type { User } from '@/modules/user/types/userApiTypes'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    InputItem,
    TextArea,
    Button,
    ErrorsList
  },
  setup() {
    const { t } = useI18n()
    let serverErrors = ref<ServerErrorsType>({})
    const { logout } = useLogout()

    const inputs = reactive({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    } as InputsData)

    const rules = computed(() => {
      return {
        image: { required, $autoDirty: true },
        email: { required, email, $autoDirty: true }
      }
    })

    const v$ = useVuelidate(rules, inputs)
    const isLoading: Ref<boolean> = ref(false)
    const store = useStore()
    const handleSubmit = async () => {
      v$.value.$validate()
      if (!v$.value.errors) {
        try {
          isLoading.value = true
          const payload = {
            user: inputs
          }
          const {
            data: { user }
          } = await updateUser(payload)
          setUserData(user)
          store.commit('SET_USER', user)
        } catch (error: any) {
          serverErrors.value = error.errors
        } finally {
          isLoading.value = false
        }
      }
    }

    const handleLogout = () => {
      logout()
    }

    const setUserData = (data: User): void => {
      inputs.image = data.image
      inputs.username = data.username
      inputs.bio = data.bio
      inputs.email = data.email
    }

    onMounted(async () => {
      const {
        data: { user }
      } = await getUser()
      setUserData(user)
    })

    return {
      t,
      inputs,
      handleSubmit,
      handleLogout,
      handleClientErrors,
      v$,
      serverErrors,
      isLoading,
      onMounted
    }
  }
})
</script>
