<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { getUserProfile } from '../api/profile.api'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import { IProfile } from '../types/profileApiTypes'
import { useStore } from 'vuex'
import PageLoader from '@/components/PageLoader.vue'
import { getArticles } from '@/modules/articles/api/articles.api'
import type {
  Article as ArticleType,
  GetArticlesParams
} from '@/modules/articles/types/articlesApiTypes'
import { usePagination } from '@/hooks/usePagination'
import { perPage } from '@/constants/config'
import Article from '@/modules/articles/components/Article.vue'
import Pagination from '@/modules/articles/components/Pagination.vue'
import { postFavorite } from '@/api/favorite/favorite.api'

let isLoading = ref<boolean>(false)
const route = useRoute()

const profile = reactive({
  username: '',
  bio: '',
  image: '',
  following: ''
} as unknown as IProfile)

const getProfile = async (): Promise<void> => {
  try {
    isLoading.value = true
    const {
      data: { profile }
    } = await getUserProfile(route.params.id)

    serializeProfileData(profile)
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    isLoading.value = false
  }
}

const serializeProfileData = (data: IProfile) => {
  profile.username = data.username
  profile.bio = data.bio
  profile.image = data.image
  profile.following = data.following
}

const store = useStore()
const isAuthor = computed(() => {
  const authorName = profile.username
  if (authorName && store.getters.getUserData) {
    return authorName === store.getters.getUserData.username
  }
  return false
})

const articles = ref<ArticleType[]>([])
const pagination = ref<number[]>([])
const activePage = ref<number>(1)
const params = reactive({
  limit: perPage,
  offset: 0,
  author: route.params.id
} as GetArticlesParams)
const getArticlesList = async (params: GetArticlesParams) => {
  try {
    isLoading.value = true
    const { data } = await getArticles(params)
    articles.value = data.articles
    pagination.value = usePagination(data.articlesCount)
  } catch (error) {
    console.log('error')
  } finally {
    isLoading.value = false
  }
}

const handlePageClick = (page: number) => {
  params.offset = (page - 1) * 10
  activePage.value = page
  getArticlesList(params)
}

const handleFavoriteClick = async (slug: string) => {
  await postFavorite(slug)
  getArticlesList(params)
}

onMounted(async () => {
  getProfile()
  getArticlesList(params)
})
</script>

<template>
  <div class="profile-page">
    <PageLoader v-if="isLoading" />
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  :to="`/${profile.username}`"
                  >{{
                    isAuthor ? 'My Articles' : profile.username
                  }}</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  v-if="isAuthor"
                  :to="`/${profile.username}/favorites`"
                  class="nav-link"
                  >Favorited Articles</router-link
                >
              </li>
            </ul>
          </div>

          <template v-for="(article, idx) in articles" :key="idx">
            <Article
              :article="article"
              @favoriteClicked="handleFavoriteClick"
            />
          </template>

          <Pagination
            v-if="pagination.length"
            :pagination="pagination"
            :activePage="activePage"
            @onPageClick="handlePageClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>
