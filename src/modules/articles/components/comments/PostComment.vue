<script setup lang="ts">
import TextArea from '@/components/TextArea.vue'
import Button from '@/components/Button.vue'
import { ref, computed } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { handleClientErrors } from '@/hooks/handleErrors'

const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'onSubmit', comment: string): void
}>()

const comment = ref<string>('')
const rules = computed(() => {
  return {
    comment: { required, minLength: minLength(3), $autoDirty: true }
  }
})
const v$ = useVuelidate(rules, { comment })

const store = useStore()
const userImage = computed(() => {
  return store.getters.getUserData ? store.getters.getUserData?.image : null
})
</script>

<template>
  <form @submit.prevent="emit('onSubmit', comment)" class="card comment-form">
    <div class="card-block">
      <TextArea
        class="form-control"
        placeholder="Write a comment"
        :rows="3"
        v-model="comment"
        :errorMessage="handleClientErrors(v$, 'comment')"
      />
    </div>
    <div class="card-footer">
      <img :src="userImage" class="comment-author-img" />
      <Button
        type="submit"
        class="btn btn-sm btn-primary"
        text="Post comment"
        :isLoading="props.isLoading"
        :disabled="v$.comment.$invalid"
      />
    </div>
  </form>
</template>
