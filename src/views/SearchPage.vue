<template>
  <page-layout>
    <section class="py-4 bg-teal-700">
      <div class="container mx-auto">
        <form class="form">
          <div class="form__field relative">
            <i class="input-icon material-icons absolute text-gray-500">search</i>
            <input class="input__search" id="where" type="text" placeholder="Mexico City, Mexico" />
          </div>
        </form>
      </div>
    </section>
    <section class="section__items py-8">
      <div class="container mx-auto">
        <h1 class="text-3xl font-light mb-3">Explore all</h1>
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <div class="house__card mb-3" v-for="room in rooms" :key="room['.key']">
            <div class="house__thumbnail relative overflow-hidden h-48">
              <img class="house__image absolute w-full" width="250" :src="room.featured_image" />
            </div>
            <div class="house__content bg-white p-3 border rounded">
              <div class="house__type font-semibold text-xs uppercase text-teal-600 mb-1">
                {{ room.type }}
              </div>
              <div class="house__title font-bold mb-2">{{ room.title }}</div>
              <div class="house__price text-xs">
                <span class="font-bold">${{ room.price }}</span> per night
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
