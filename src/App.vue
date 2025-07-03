<template>
  <div id="app" class="min-h-screen bg-gradient-hero">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4">
      <!-- Refined Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-16 h-16 bg-gradient-primary rounded-full animate-float opacity-15"></div>
        <div class="absolute top-40 right-20 w-12 h-12 bg-gradient-secondary rounded-full animate-float opacity-20" style="animation-delay: 1.5s;"></div>
        <div class="absolute bottom-20 left-1/4 w-8 h-8 bg-gradient-accent rounded-full animate-float opacity-18" style="animation-delay: 2.5s;"></div>
        <div class="absolute bottom-40 right-1/4 w-20 h-20 bg-gradient-primary rounded-full animate-float opacity-12" style="animation-delay: 0.8s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-secondary rounded-full animate-float opacity-10" style="animation-delay: 3s;"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 text-center animate-slide-up">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in tracking-tight">
          RoomHotel
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in font-light" style="animation-delay: 0.3s;">
          Encuentra tu lugar ideal en cualquier parte del mundo
        </p>

        <!-- Professional Search Card -->
        <div class="glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto animate-scale-in" style="animation-delay: 0.6s;">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              placeholder="¿Dónde vas?"
              class="input-professional w-full px-4 py-3 rounded-lg text-white placeholder-white/70 focus:outline-none"
            >
            <input
              type="date"
              class="input-professional w-full px-4 py-3 rounded-lg text-white focus:outline-none"
            >
            <input
              type="number"
              placeholder="Huéspedes"
              class="input-professional w-full px-4 py-3 rounded-lg text-white placeholder-white/70 focus:outline-none"
            >
          </div>
          <button class="btn-professional w-full text-white font-semibold py-3 px-6 rounded-lg">
            🔍 Buscar Habitaciones
          </button>
        </div>

        <!-- Professional Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div class="glass rounded-xl p-6 text-center card-float animate-fade-in" style="animation-delay: 0.9s;">
            <div class="text-3xl mb-4">🏠</div>
            <h3 class="text-white font-semibold mb-2 text-lg">Miles de Propiedades</h3>
            <p class="text-white/80 text-sm leading-relaxed">Encuentra desde casas hasta apartamentos únicos en todo el mundo</p>
          </div>

          <div class="glass rounded-xl p-6 text-center card-float animate-fade-in" style="animation-delay: 1.1s;">
            <div class="text-3xl mb-4">⭐</div>
            <h3 class="text-white font-semibold mb-2 text-lg">Reservas Seguras</h3>
            <p class="text-white/80 text-sm leading-relaxed">Pago seguro y confirmación instantánea de tu reserva</p>
          </div>

          <div class="glass rounded-xl p-6 text-center card-float animate-fade-in" style="animation-delay: 1.3s;">
            <div class="text-3xl mb-4">🎯</div>
            <h3 class="text-white font-semibold mb-2 text-lg">Experiencias Únicas</h3>
            <p class="text-white/80 text-sm leading-relaxed">Vive experiencias locales auténticas y memorables</p>
          </div>
        </div>

        <!-- Professional CTA Section -->
        <div class="mt-12 animate-fade-in" style="animation-delay: 1.5s;">
          <p class="text-white/80 mb-4 text-lg">¿Tienes una propiedad para alquilar?</p>
          <button class="btn-professional text-white font-semibold py-3 px-8 rounded-lg">
            Listar mi Propiedad
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Professional TypeScript setup
</script>

<style scoped>
/* Professional additional styles */
</style>
