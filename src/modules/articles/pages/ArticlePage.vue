<script setup lang="ts">
import { getArticle } from '@/modules/articles/api/articles.api'
import { Article } from '../types/articlesApiTypes'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import UserProfile from '@/components/UserProfile.vue'
import ArticleActions from '../components/ArticleActions.vue'
import Comments from '../components/comments/Comments.vue'
import { postFavorite, postUnFavorite } from '@/api/favorite/favorite.api'
import { deleteArticle } from '@/modules/articles/api/articles.api'
import { followUser, unFollowUser } from '@/modules/profile/api/profile.api'
import PageLoader from '@/components/PageLoader.vue'
import { toast } from 'vue3-toastify'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
let isLoading = ref<boolean>(false)

const store = useStore()
const isAuthor = computed(() => {
  const authorName = articleData?.value.author.username
  if (authorName && store.getters.getUserData) {
    return authorName === store.getters.getUserData.username
  }
  return false
})

let articleData = ref<Article | null>(null)
const getArticleData = async () => {
  try {
    isLoading.value = true
    const {
      data: { article }
    } = await getArticle(route.params.id)
    articleData.value = article
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

const handleFavoriteClick = async (value: string) => {
  try {
    isLoading.value = true
    const slug = articleData.value.slug
    if (value === 'favorite') {
      await postFavorite(slug)
      getArticleData()
    } else {
      await postUnFavorite(slug)
      getArticleData()
    }
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

const handlefollowClicked = async (value: string): Promise<void> => {
  try {
    isLoading.value = true
    const userName = articleData.value.author.username
    if (value === 'follow') {
      await followUser(userName)
      getArticleData()
    } else {
      await unFollowUser(userName)
      getArticleData()
    }
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

const handleDeleteArticle = async (): Promise<void> => {
  try {
    isLoading.value = true
    await deleteArticle(articleData.value.slug)
    toast.success('Article was deleted')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getArticleData()
})
</script>

<template>
  <div class="article-page">
    <PageLoader v-if="isLoading" />
    <div class="banner">
      <div class="container">
        <h1>{{ articleData?.title }}</h1>
        <div class="article-meta">
          <UserProfile
            v-if="articleData"
            :username="articleData?.author.username"
            :img="articleData?.author.image"
            :createdAt="articleData?.createdAt"
          />
          <ArticleActions
            v-if="articleData"
            :authorName="articleData?.author.username"
            :following="articleData?.author.following"
            :favorited="articleData?.favorited"
            :favoritesCount="articleData?.favoritesCount"
            :slug="articleData?.slug"
            :isAuthor="isAuthor"
            @favoriteClicked="handleFavoriteClick"
            @followClicked="handlefollowClicked"
            @deleteArticle="handleDeleteArticle"
          />
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <h2 id="introducing-ionic">{{ articleData?.description }}</h2>
          <p>{{ articleData?.body }}</p>
          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline"
              v-for="(tag, idx) in articleData?.tagList"
              :key="idx"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <UserProfile
            v-if="articleData"
            :username="articleData?.author.username"
            :img="articleData?.author.image"
            :createdAt="articleData?.createdAt"
          />

          <ArticleActions
            v-if="articleData"
            :authorName="articleData?.author.username"
            :following="articleData?.author.following"
            :favorited="articleData?.favorited"
            :favoritesCount="articleData?.favoritesCount"
            :slug="articleData?.slug"
            :isAuthor="isAuthor"
            @favoriteClicked="handleFavoriteClick"
            @followClicked="handlefollowClicked"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <Comments
            v-if="articleData"
            :slug="articleData?.slug"
            :isAuthor="isAuthor"
          />
        </div>
      </div>
    </div>
  </div>
</template>
