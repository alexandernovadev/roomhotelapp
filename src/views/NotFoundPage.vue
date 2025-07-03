<template>
  <div class="min-h-screen bg-gradient-dark flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-white mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-white mb-4">Página no encontrada</h2>
      <p class="text-white/70 text-lg mb-8">La página que buscas no existe</p>
      <router-link
        to="/"
        class="btn-professional text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform"
      >
        Volver al Inicio
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Página básica - sin lógica por ahora
</script>
