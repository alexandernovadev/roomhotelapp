<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">R</span>
            </div>
            <span class="text-white font-bold text-xl hidden sm:block">RoomHotel</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-white/80 hover:text-white transition-colors duration-200 font-medium"
            active-class="text-white"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <!-- User Menu / Auth Buttons -->
        <div class="flex items-center space-x-4">
          <!-- Search Button (Mobile) -->
          <button
            class="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            @click="$emit('toggleSearch')"
          >
            🔍
          </button>

          <!-- Auth Buttons -->
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="text-white/80 hover:text-white transition-colors font-medium"
            >
              Iniciar Sesión
            </router-link>
            <CTAButton
              text="Registrarse"
              variant="outline"
              size="sm"
              @click="$router.push('/register')"
            />
          </template>

          <!-- User Menu -->
          <template v-else>
            <div class="relative">
              <button
                class="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                @click="toggleUserMenu"
              >
                <img
                  :src="user?.avatar || '/default-avatar.png'"
                  :alt="user?.name"
                  class="w-8 h-8 rounded-full border-2 border-white/20"
                >
                <span class="hidden sm:block font-medium">{{ user?.name }}</span>
                <span class="text-xs">▼</span>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg py-2"
              >
                <router-link
                  to="/user/profile"
                  class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  @click="showUserMenu = false"
                >
                  Mi Perfil
                </router-link>
                <router-link
                  to="/user/rooms"
                  class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  @click="showUserMenu = false"
                >
                  Mis Habitaciones
                </router-link>
                <router-link
                  to="/user/bookings"
                  class="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  @click="showUserMenu = false"
                >
                  Mis Reservas
                </router-link>
                <hr class="border-white/10 my-2">
                <button
                  class="block w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  @click="handleLogout"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CTAButton from '@/components/ui/CTAButton.vue';
import type { User } from '@/types';

// Props
interface Props {
  user?: User | null;
  isAuthenticated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  isAuthenticated: false,
});

// Emits
const emit = defineEmits<{
  toggleSearch: [];
  logout: [];
}>();

// Router
const router = useRouter();

// State
const showUserMenu = ref(false);

// Navigation items (DRY - centralized data)
const navigationItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Buscar', path: '/search' },
  { label: 'Explorar', path: '/explore' },
  { label: 'Ayuda', path: '/help' },
];

// Methods (KISS - simple functions)
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleLogout = () => {
  showUserMenu.value = false;
  emit('logout');
};

// Close menu when clicking outside
const closeMenu = () => {
  showUserMenu.value = false;
};

// Lifecycle
onMounted(() => {
  // Close menu on route change
  router.afterEach(() => {
    showUserMenu.value = false;
  });
});
</script>
