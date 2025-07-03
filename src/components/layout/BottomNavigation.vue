<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10">
    <div class="flex items-center justify-around py-2">
      <router-link
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200"
        :class="[
          $route.path === item.path
            ? 'text-white bg-white/10'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        ]"
      >
        <span class="text-xl mb-1">{{ item.icon }}</span>
        <span class="text-xs font-medium">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Navigation items (DRY - centralized data)
const navigationItems = [
  { label: 'Inicio', path: '/', icon: '🏠' },
  { label: 'Buscar', path: '/search', icon: '🔍' },
  { label: 'Favoritos', path: '/favorites', icon: '❤️' },
  { label: 'Perfil', path: '/user/profile', icon: '��' },
];
</script>
