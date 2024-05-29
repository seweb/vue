<script setup lang="ts">
import InputItem from '@/components/InputItem.vue'
import TextArea from '@/components/TextArea.vue'
import Button from '@/components/Button.vue'
import { NewArticle, NewArticleResponse } from '../types/articlesApiTypes'
import { ref, reactive, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { handleClientErrors } from '@/hooks/handleErrors'
import { toast } from 'vue3-toastify'
import { postArticle, updateArticle, getArticle } from '../api/articles.api'
import { useRoute, useRouter } from 'vue-router'
import ErrorsList from '@/components/ErrorsList.vue'
import { ServerErrorsType } from '@/types/apiTypes'

const inputs = reactive({
  title: '',
  description: '',
  body: '',
  tagList: ''
} as NewArticle)

let serverErrors = ref<ServerErrorsType>({})

const rules = computed(() => {
  return {
    title: { required, $autoDirty: true },
    description: { required, $autoDirty: true },
    body: { required, $autoDirty: true }
  }
})
const v$ = useVuelidate(rules, inputs)
const $route = useRoute()
const $router = useRouter()

const isLoading = ref<boolean>(false)
const splitTags = (tags: string) => {
  return tags.split(',')
}
const handleSubmit = async (): Promise<void> => {
  v$.value.$validate()
  if (!v$.value.errors) {
    const payload = {
      article: {
        title: inputs.title,
        description: inputs.description,
        body: inputs.body,
        tagList: splitTags(inputs.tagList)
      }
    }
    if (isNewArticle) {
      await postArticle(payload)
      await toast.success('Article was created')
      $router.push('/')
    } else {
      await updateArticle($route.params.id, payload)
      toast.success('Article was updated')
      $router.push('/')
    }
    try {
      isLoading.value = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      serverErrors.value = error.errors
      toast.error('Something went wrong')
    } finally {
      isLoading.value = false
    }
  }
}

const serializeData = (data: NewArticleResponse) => {
  inputs.title = data.title
  inputs.description = data.description
  inputs.body = data.body
  inputs.tagList = data.tagList.join(',')
}

let isNewArticle = false
onMounted(async () => {
  isNewArticle = $route.path === '/editor' ? true : false
  if (!isNewArticle) {
    const { data } = await getArticle($route.params.id)
    serializeData(data.article)
  }
})
</script>
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ErrorsList :errors="serverErrors" />
          <form @submit.prevent="handleSubmit">
            <InputItem
              class="form-control form-control-lg"
              type="text"
              placeholder="Article Title"
              :errorMessage="handleClientErrors(v$, 'title')"
              v-model="inputs.title"
            />
            <InputItem
              class="form-control form-control-lg"
              type="text"
              placeholder="What's this article about?"
              :errorMessage="handleClientErrors(v$, 'description')"
              v-model="inputs.description"
            />
            <TextArea
              class="form-control form-control-lg"
              placeholder="Write your article (in markdown)"
              :rows="8"
              :errorMessage="handleClientErrors(v$, 'body')"
              v-model="inputs.body"
            />
            <InputItem
              class="form-control form-control-lg"
              type="text"
              placeholder="Ener tags"
              v-model="inputs.tagList"
            />
            <Button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              text="Publish article"
              :isLoading="isLoading"
              :disabled="v$.$invalid"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
