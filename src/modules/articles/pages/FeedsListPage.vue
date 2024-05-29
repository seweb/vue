<template>
  <div class="home-page">
    <PageLoader v-if="isLoading" />
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link to="/feed" class="nav-link">Your Feed</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/" class="nav-link">Global Feed</router-link>
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

        <div class="col-md-3">
          <div class="sidebar">
            <TagsList :tags="tagsList" @tagClicked="handleTagClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getFeeds, getTags } from '@/modules/articles/api/articles.api'
import { postFavorite } from '@/api/favorite/favorite.api'
import type {
  Article as ArticleType,
  GetArticlesParams
} from '../types/articlesApiTypes'
import PageLoader from '@/components/PageLoader.vue'
import Article from '../components/Article.vue'
import TagsList from '../components/TagsList.vue'
import Pagination from '../components/Pagination.vue'
import { usePagination } from '@/hooks/usePagination'
import { perPage } from '@/constants/config'

export default defineComponent({
  name: 'FeedsListPage',
  components: {
    PageLoader,
    Article,
    TagsList,
    Pagination
  },
  setup() {
    const { t } = useI18n()
    const articles = ref<ArticleType[]>([])
    const isLoading = ref<boolean>(false)
    const tagsList = ref<string[]>([])
    const pagination = ref<number[]>([])
    const activePage = ref<number>(1)
    const params = reactive({
      limit: perPage,
      offset: 0
    } as GetArticlesParams)

    const getArticlesList = async (params: GetArticlesParams) => {
      try {
        isLoading.value = true
        const { data } = await getFeeds(params)
        articles.value = data.articles
        pagination.value = usePagination(data.articlesCount)
      } catch (error) {
        console.log('error')
      } finally {
        isLoading.value = false
      }
    }

    const getTagsList = async () => {
      try {
        isLoading.value = true
        const {
          data: { tags }
        } = await getTags()
        tagsList.value = tags
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

    const handleTagClick = (tag: string) => {
      params.tag = tag
      getArticlesList(params)
    }

    const handleFavoriteClick = async (slug: string) => {
      await postFavorite(slug)
      getArticlesList(params)
    }

    onMounted(() => {
      getArticlesList(params)
      getTagsList()
    })
    return {
      t,
      articles,
      isLoading,
      tagsList,
      handleTagClick,
      handleFavoriteClick,
      pagination,
      handlePageClick,
      activePage
    }
  }
})
</script>
