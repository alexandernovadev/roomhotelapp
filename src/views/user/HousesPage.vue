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
    <section class="section__houses py-6">
      <div class="container mx-auto">
        <h1 class="text-3xl font-light m-3">My Houses</h1>
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div class="house__card mb-3" v-for="room in userRooms" :key="room['.key']">
            <div class="relative overflow-hidden h-40 sm:h-48">
              <img
                class="house__image absolute w-full"
                :src="room.featured_image"
              />
            </div>
            <div class="house__content bg-white p-3 border rounded">
              <div class="house__type font-semibold text-xs uppercase text-teal-600 mb-1">
                {{ room.type }}
              </div>
              <div class="house__title font-bold mb-2">
                {{ room.title }}
              </div>
              <div class="house__price text-xs">
                <span class="font-bold">${{ room.price }} MXN</span> per night
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </page-layout>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PageLayout from '@/layouts/PageLayout.vue';

export default {
  name: 'HousesPages',
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.authUser);

    const userRooms = computed(() => {
      if (!user.value || !user.value.rooms) {
        return [];
      }
      return Object.values(user.value.rooms).map(roomId => store.state.rooms[roomId]).filter(Boolean);
    });

    return {
      userRooms,
    };
  },
  components: {
    PageLayout,
  },
};
</script>
