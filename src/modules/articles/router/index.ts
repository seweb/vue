import ArticlesListPage from '../pages/ArticlesListPage.vue'
import FeedsListPage from '../pages/FeedsListPage.vue'
import ArticlePage from '../pages/ArticlePage.vue'
import CreateArticle from '../pages/CreateArticle.vue'
export const articlesRoutes = [
  {
    path: '/',
    name: 'ArticlesListPage',
    component: ArticlesListPage
  },
  {
    path: '/article/:id',
    name: 'ArticlePage',
    component: ArticlePage
  },
  {
    path: '/editor',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/editor/:id',
    name: 'UpdateArticle',
    component: CreateArticle
  },
  {
    path: '/feed',
    name: 'FeedsListPage',
    component: FeedsListPage
  }
]
