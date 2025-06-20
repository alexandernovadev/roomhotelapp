<template>
  <default-layout>
    <section class="container py-6 mx-auto">
      <h1 class="text-3xl font-light text-gray-800 mb-3">Recommended</h1>
      <div class="section">
        <!-- Here

        <tiny-slider>
          <div class="slider-item">1</div>
          <div class="slider-item">2</div>
          <div class="slider-item">3</div>
          <div class="slider-item">4</div>
          <div class="slider-item">5</div>
          <div class="slider-item">6</div>
        </tiny-slider> -->
      </div>
    </section>
    <section class="container py-6 mx-auto">
      <h1 class="text-3xl font-light text-gray-800 mb-3">Explore</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden" v-for="room in rooms" :key="room['.key']">
          <div class="relative h-48 overflow-hidden">
            <img class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" :src="room.featured_image" :alt="room.title" />
            <div class="absolute top-3 left-3">
              <span class="bg-white bg-opacity-90 text-teal-600 text-xs font-semibold px-2 py-1 rounded-full">
                {{ room.type }}
              </span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">{{ room.title }}</h3>
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600">
                <span class="font-bold text-lg text-gray-900">${{ room.price }}</span>
                <span class="text-gray-500"> / night</span>
              </div>
              <button class="bg-teal-500 hover:bg-teal-600 text-white text-xs font-medium px-3 py-1 rounded-full transition-colors duration-200">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <router-link
          class="py-3 px-12 bg-yellow-400 no-underline text-yellow-800 text-lg rounded"
          :to="{ name: 'SearchPage' }"
        >
          Show all
        </router-link>
      </div>
    </section>
  </default-layout>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
// import TinySlider from '@/components/TinySlider.vue';

export default {
  name: 'HomePage',
  setup() {
    const store = useStore();

    const rooms = computed(() => store.getters.rooms);

    onMounted(() => {
      store.dispatch('FETCH_ROOMS', 12);
    });

    return {
      rooms,
    };
  },
  components: {
    DefaultLayout,
    // TinySlider,
  },
};
</script>

<style lang="css">
/* Custom styles removed - using Tailwind CSS classes */
</style>
