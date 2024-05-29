<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ t('auth.signIn') }}</h1>
          <p class="text-xs-center">
            <a href="/register">{{ t('auth.needAnAccount') }}</a>
          </p>

          <ErrorsList :errors="serverErrors" />

          <form @submit.prevent="handleSubmit">
            <InputItem
              class="form-control form-control-lg"
              type="text"
              :placeholder="t('auth.email')"
              :errorMessage="handleClientErrors(v$, 'email')"
              v-model="inputs.email"
            />
            <InputItem
              class="form-control form-control-lg"
              type="text"
              :placeholder="t('auth.password')"
              :errorMessage="handleClientErrors(v$, 'password')"
              v-model="inputs.password"
            />
            <Button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              :disabled="false"
              :text="t('auth.signUp')"
              :isLoading="isLoading"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { InputsData } from '../types/registerFormTypes'
import { ServerErrorsType } from '@/types/apiTypes'
import { useVuelidate } from '@vuelidate/core'
import { loginUser } from '../api/auth.api'
import { required, email } from '@vuelidate/validators'
import { handleClientErrors } from '@/hooks/handleErrors'
import { useStore } from 'vuex'
import ErrorsList from '@/components/ErrorsList.vue'
import InputItem from '@/components/InputItem.vue'
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router'
import { setItem } from '@/utils/localStorageService'

export default defineComponent({
  name: 'LoginPage',
  components: {
    InputItem,
    Button,
    ErrorsList
  },
  setup() {
    const { t } = useI18n()

    let serverErrors = ref<ServerErrorsType>({})

    const store = useStore()

    const router = useRouter()

    const inputs = reactive({
      email: '',
      password: ''
    } as InputsData)

    const rules = computed(() => {
      return {
        email: { required, email, $autoDirty: true },
        password: { required, $autoDirty: true }
      }
    })

    const v$ = useVuelidate(rules, inputs)
    const isLoading: Ref<boolean> = ref(false)
    const handleSubmit = async () => {
      v$.value.$validate()
      if (!v$.value.errors) {
        const payload = {
          user: {
            ...inputs
          }
        }
        try {
          isLoading.value = true
          const {
            data: { user }
          } = await loginUser(payload)
          store.commit('SET_USER', user)
          setItem('token', user.token)
          router.push('/')
        } catch (error: any) {
          serverErrors.value = error.errors
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      t,
      inputs,
      handleSubmit,
      handleClientErrors,
      v$,
      serverErrors,
      isLoading
    }
  }
})
</script>
