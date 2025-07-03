<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header
      :user="user"
      :is-authenticated="isAuthenticated"
      @toggle-search="handleToggleSearch"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <main class="flex-1 pt-16 pb-20 md:pb-0">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Bottom Navigation (Mobile Only) -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';
import BottomNavigation from './BottomNavigation.vue';
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

// Methods (KISS - simple event handlers)
const handleToggleSearch = () => {
  emit('toggleSearch');
};

const handleLogout = () => {
  emit('logout');
};
</script>
