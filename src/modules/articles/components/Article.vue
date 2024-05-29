<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Article } from '../types/articlesApiTypes'
import { useDate } from 'vue3-dayjs-plugin/useDate'

const props = defineProps<{
  article: Article
}>()

const date = useDate()

const emits = defineEmits(['favoriteClicked'])
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="article.author.username">
        <img :src="article.author.image" />
      </router-link>
      <div class="info">
        <router-link :to="article.author.username">
          {{ props.article.author.username }}
        </router-link>
        <span class="date"
          >{{ date(article.createdAt).format('MMMM DD') }}th</span
        >
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i
          class="ion-heart"
          @click="emits('favoriteClicked', article.slug)"
        ></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="(tag, idx) in article.tagList"
          :key="idx"
        >
          {{ tag }}
        </li>
      </ul>
    </router-link>
  </div>
</template>
