import { createRouter, createWebHistory } from 'vue-router'
import { auth } from './firebase'
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
    meta: { requiresAuth: true }
  },
  {
    path: '/house',
    redirect: { name: 'ProfilePage' },
    meta: { requiresAuth: true }
  },
  {
    path: '/house/new',
    name: 'CreateHomePage',
    component: CreateHousePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/profile',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/houses',
    name: 'HousesPages',
    component: HousesPages,
    meta: { requiresAuth: true }
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

// Navigation guard para proteger rutas
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Verificar si hay un usuario autenticado
  const isAuthenticated = auth.currentUser

  if (requiresAuth && !isAuthenticated) {
    // Redirigir a la página principal si no está autenticado
    next({ name: 'HomePage' })
  } else if (requiresAuth && isAuthenticated) {
    // Si requiere autenticación y el usuario está autenticado, permitir acceso
    next()
  } else {
    // Para rutas que no requieren autenticación
    next()
  }
})

export default router
