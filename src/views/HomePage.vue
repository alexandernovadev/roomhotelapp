<template>
  <div class="min-h-screen bg-gradient-hero">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4">
      <!-- Animated Background -->
      <AnimatedBackground />

      <!-- Main Content -->
      <div class="relative z-10 text-center animate-slide-up">
        <!-- Hero Title -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in tracking-tight">
          RoomHotel
        </h1>

        <!-- Hero Subtitle -->
        <p class="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in font-light" style="animation-delay: 0.3s;">
          Encuentra tu lugar ideal en cualquier parte del mundo
        </p>

        <!-- Search Form -->
        <SearchForm
          :delay="0.6"
          @search="handleSearch"
        />

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <FeatureCard
            v-for="(feature, index) in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
            :delay="0.9 + (index * 0.2)"
          />
        </div>

        <!-- CTA Section -->
        <div class="mt-12 animate-fade-in" style="animation-delay: 1.5s;">
          <p class="text-white/80 mb-4 text-lg">¿Tienes una propiedad para alquilar?</p>
          <CTAButton
            text="Listar mi Propiedad"
            variant="primary"
            size="md"
            @click="handleListProperty"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AnimatedBackground from '@/components/home/AnimatedBackground.vue';
import SearchForm from '@/components/home/SearchForm.vue';
import FeatureCard from '@/components/home/FeatureCard.vue';
import CTAButton from '@/components/ui/CTAButton.vue';

// Feature data (DRY - centralized data)
const features = [
  {
    icon: '🏠',
    title: 'Miles de Propiedades',
    description: 'Encuentra desde casas hasta apartamentos únicos en todo el mundo',
  },
  {
    icon: '⭐',
    title: 'Reservas Seguras',
    description: 'Pago seguro y confirmación instantánea de tu reserva',
  },
  {
    icon: '🎯',
    title: 'Experiencias Únicas',
    description: 'Vive experiencias locales auténticas y memorables',
  },
];

// Event handlers (KISS - simple functions)
const handleSearch = (searchData: any) => {
  console.log('Search data:', searchData);
  // TODO: Navigate to search page with data
};

const handleListProperty = () => {
  console.log('List property clicked');
  // TODO: Navigate to property creation page
};
</script>
