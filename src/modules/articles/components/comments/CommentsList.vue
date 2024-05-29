<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Comment } from '@/modules/articles/types/articlesApiTypes'
import { useDate } from 'vue3-dayjs-plugin/useDate'

const props = defineProps<{
  comments: Comment[]
  isAuthor: boolean
}>()

const emit = defineEmits<{
  (e: 'deleteComment', value: number): void
}>()

const date = useDate()
</script>
<template>
  <div class="card" v-for="comment in comments" :key="comment.id">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <router-link :to="`/profile/${comment.author.username}`">
        <img :src="comment.author.image" class="comment-author-img" />
      </router-link>
      &nbsp;
      <router-link :to="`/profile/${comment.author.username}`">{{
        comment.author.username
      }}</router-link>
      <span class="date"
        >{{ date(comment.createdAt).format('MMMM DD') }}th</span
      >
      <span
        v-if="isAuthor"
        @click="emit('deleteComment', comment.id)"
        class="mod-options"
      >
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
