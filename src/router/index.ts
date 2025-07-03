import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { auth } from '@/firebase';
import type { User } from 'firebase/auth';

// Import views (we'll create these later)
const HomePage = () => import('@/views/HomePage.vue');
const SearchPage = () => import('@/views/SearchPage.vue');
const NotFoundPage = () => import('@/views/NotFoundPage.vue');
const LoginPage = () => import('@/views/auth/LoginPage.vue');
const RegisterPage = () => import('@/views/auth/RegisterPage.vue');
const ProfilePage = () => import('@/views/user/ProfilePage.vue');
const CreateRoomPage = () => import('@/views/user/CreateRoomPage.vue');
const UserRoomsPage = () => import('@/views/user/UserRoomsPage.vue');
const RoomDetailPage = () => import('@/views/RoomDetailPage.vue');

// Route definitions
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      title: 'Inicio - RoomHotel',
      requiresAuth: false,
    },
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    meta: {
      title: 'Buscar - RoomHotel',
      requiresAuth: false,
    },
  },
  {
    path: '/room/:id',
    name: 'RoomDetailPage',
    component: RoomDetailPage,
    meta: {
      title: 'Detalle de Habitación - RoomHotel',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      title: 'Iniciar Sesión - RoomHotel',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      title: 'Registrarse - RoomHotel',
      requiresAuth: false,
    },
  },
  {
    path: '/user',
    redirect: { name: 'ProfilePage' },
    meta: { requiresAuth: true },
  },
  {
    path: '/user/profile',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: {
      title: 'Mi Perfil - RoomHotel',
      requiresAuth: true,
    },
  },
  {
    path: '/user/rooms',
    name: 'UserRoomsPage',
    component: UserRoomsPage,
    meta: {
      title: 'Mis Habitaciones - RoomHotel',
      requiresAuth: true,
    },
  },
  {
    path: '/user/rooms/create',
    name: 'CreateRoomPage',
    component: CreateRoomPage,
    meta: {
      title: 'Crear Habitación - RoomHotel',
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: NotFoundPage,
    meta: {
      title: 'Página no encontrada - RoomHotel',
      requiresAuth: false,
    },
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser: User | null = auth.currentUser;

  // Update page title
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  if (requiresAuth && !currentUser) {
    // Redirect to login if authentication is required but user is not authenticated
    next({ name: 'LoginPage', query: { redirect: to.fullPath } });
  } else if (to.name === 'LoginPage' && currentUser) {
    // Redirect to home if user is already authenticated and trying to access login
    next({ name: 'HomePage' });
  } else if (to.name === 'RegisterPage' && currentUser) {
    // Redirect to home if user is already authenticated and trying to access register
    next({ name: 'HomePage' });
  } else {
    // Allow navigation for all other cases
    next();
  }
});

export default router;
