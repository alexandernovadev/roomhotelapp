import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import SearchPage from './views/SearchPage.vue'
import NotFoundPage from './views/NotFoundPage.vue'
import CreateHousePage from './views/user/CreateHousePage.vue'

// User Pages
import ProfilePage from './views/user/ProfilePage.vue'
import HousesPages from './views/user/HousesPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
  },
  {
    path: '/user',
    redirect: { name: 'ProfilePage' },
  },
  {
    path: '/house',
    redirect: { name: 'ProfilePage' },
  },
  {
    path: '/house/new',
    name: 'CreateHomePage',
    component: CreateHousePage,
  },
  {
    path: '/user/profile',
    name: 'ProfilePage',
    component: ProfilePage,
  },
  {
    path: '/user/houses',
    name: 'HousesPages',
    component: HousesPages,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
