import ProfilePage from '../pages/ProfilePage.vue'
import ProfileFavoritedPage from '../pages/ProfileFavoritedPage.vue'

export const profileRoutes = [
  {
    path: '/:id',
    name: 'ProfilePage',
    component: ProfilePage
  },
  {
    path: '/:id/favorites',
    name: 'ProfileFavoritedPage',
    component: ProfileFavoritedPage
  }
]
