<template>
  <div id="app">
    <!-- Public Layout for non-authenticated users -->
    <PublicLayout
      v-if="!isAuthenticated"
      :user="user"
      :is-authenticated="isAuthenticated"
      @toggle-search="handleToggleSearch"
      @logout="handleLogout"
    >
      <router-view />
    </PublicLayout>

    <!-- Dashboard Layout for authenticated users -->
    <DashboardLayout
      v-else
      :user="user"
      @logout="handleLogout"
    >
      <router-view />
    </DashboardLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PublicLayout from '@/components/layout/PublicLayout.vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import type { User } from '@/types';

// State (KISS - simple state management)
const user = ref<User | null>(null);
const isAuthenticated = ref(false);

// Methods (KISS - simple functions)
const handleToggleSearch = () => {
  // TODO: Implement search toggle logic
  console.log('Toggle search');
};

const handleLogout = () => {
  // TODO: Implement logout logic
  user.value = null;
  isAuthenticated.value = false;
  console.log('User logged out');
};

// Lifecycle
onMounted(() => {
  // TODO: Check authentication status on mount
  // For now, simulate unauthenticated state
  isAuthenticated.value = false;
});
</script>

<style scoped>
/* App-level styles if needed */
</style>
