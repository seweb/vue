<script setup lang="ts">
import PostComment from './PostComment.vue'
import CommentsList from './CommentsList.vue'
import { postComment, getComments, deleteComment } from '../../api/articles.api'
import { toast } from 'vue3-toastify'
import { ref, watchEffect } from 'vue'
import { defineProps } from 'vue'
import { Comment } from '../../types/articlesApiTypes'

const props = defineProps<{
  slug: string
  isAuthor: boolean
}>()

const isLoading = ref<boolean>(false)

const handlePostComment = async (comment: string): Promise<void> => {
  try {
    isLoading.value = true
    const payload = {
      comment: {
        body: comment
      }
    }
    await postComment(props.slug, payload)
    getCommentsList()
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

const comments = ref<Comment | null>(null)

const getCommentsList = async (): Promise<void> => {
  try {
    isLoading.value = true
    const { data } = await getComments(props.slug)
    comments.value = data.comments
    console.log('data', comments.value)
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

const handleDeleteComment = async (commentID: number): Promise<void> => {
  try {
    isLoading.value = true
    await deleteComment(props.slug, commentID)
    getCommentsList()
    toast.success('Comment was deleted')
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (props.slug) getCommentsList()
})
</script>
<template>
  <div class="comments list">
    <PostComment @onSubmit="handlePostComment" :isLoading="isLoading" />
    <CommentsList
      v-if="comments"
      :comments="comments"
      :isAuthor="isAuthor"
      @deleteComment="handleDeleteComment"
    />
  </div>
</template>
