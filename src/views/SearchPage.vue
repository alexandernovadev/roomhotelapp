<template>
  <page-layout>
    <section class="py-6 bg-teal-700">
      <div class="container mx-auto px-4">
        <form class="max-w-md mx-auto">
          <div class="relative">
            <i class="material-icons absolute top-3 left-3 text-gray-400">search</i>
            <input
              class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              id="where"
              type="text"
              placeholder="Mexico City, Mexico"
            />
          </div>
        </form>
      </div>
    </section>
    <section class="section__items py-8">
      <div class="container mx-auto">
        <h1 class="text-3xl font-light mb-3">Explore all</h1>
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
      </div>
    </section>
  </page-layout>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import PageLayout from '@/layouts/PageLayout.vue';

export default {
  name: 'SearchPage',
  setup() {
    const store = useStore();

    const rooms = computed(() => store.getters.rooms);

    onMounted(() => {
      store.dispatch('FETCH_ROOMS');
    });

    return {
      rooms,
    };
  },
  components: {
    PageLayout,
  },
};
</script>
