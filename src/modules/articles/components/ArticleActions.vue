<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  authorName: { type: String, required: true },
  following: { type: Boolean, required: true },
  favorited: { type: Boolean, required: true },
  favoritesCount: { type: Number, required: true },
  slug: { type: String, required: true },
  isAuthor: { type: Boolean, required: true }
})

const emit = defineEmits<{
  (e: 'favoriteClicked', value: string): void
  (e: 'followClicked', value: string): void
  (e: 'deleteArticle'): void
}>()
</script>

<template>
  <template v-if="!isAuthor">
    <button
      v-if="props.following"
      @click="emit('followClicked', 'unfollow')"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-minus-round"></i>
      &nbsp; Unfollow {{ props.authorName }} <span class="counter"></span>
    </button>
    <button
      v-else
      @click="emit('followClicked', 'follow')"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp;Follow {{ props.authorName }} <span class="counter"></span>
    </button>

    &nbsp;&nbsp;
    <button
      @click="emit('favoriteClicked', 'unfavorite')"
      v-if="props.favorited"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp; Unfavorite Post
      <span class="counter">({{ props.favoritesCount }})</span>
    </button>
    <button
      v-else
      @click="emit('favoriteClicked', 'favorite')"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ props.favoritesCount }})</span>
    </button>
  </template>
  &nbsp;&nbsp;

  <template v-else>
    <router-link
      :to="`/editor/${props.slug}`"
      class="btn btn-sm btn-outline-secondary"
      >Edit Article</router-link
    >
    &nbsp;&nbsp;
    <button
      @click="emit('deleteArticle')"
      class="btn btn-sm btn-outline-danger"
    >
      <i class="ion-trash-a"></i> Delete Article
    </button>
  </template>
</template>
