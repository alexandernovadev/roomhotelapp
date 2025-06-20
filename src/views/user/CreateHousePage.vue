<template>
  <page-layout>
    <section class="py-4 bg-cyan-700">
      <div class="container mx-auto">
        <form class="form">
          <div class="form__field relative">
            <i class="input-icon material-icons absolute text-gray-500">search</i>
            <input class="input__search" id="where" type="text" placeholder="Bogotá, Colombia" />
          </div>
        </form>
      </div>
    </section>
    <section class="section__create py-6">
      <div class="container mx-auto">
        <h1 class="text-3xl">Publish a new room</h1>
        <form @submit.prevent="save">
          <div class="mb-4">
            <label class="input__label">Title</label>
            <input
              v-model="publication.title"
              class="input__field"
              type="text"
              placeholder="Amazing Appartment in the City Center"
            />
          </div>
          <div class="mb-4">
            <label class="input__label">Description</label>
            <textarea
              v-model="publication.description"
              class="input__field"
              rows="10"
              placeholder="Describe the features and amenities of the room."
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="input__label">Featured Image</label>
            <input
              v-model="publication.featuredImage"
              class="input__field"
              type="text"
              placeholder="https://images.unsplash.com/photo-1432303492674-642e9d0944b"
            />
          </div>
          <div class="mb-4 text-right">
            <button
              type="submit"
              class="w-full bg-cyan-500 text-white font-semibold py-3 px-6 rounded hover:bg-cyan-600 transition-colors duration-200"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  </page-layout>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import PageLayout from '@/layouts/PageLayout.vue';

export default {
  name: 'CreateHousePage',
  setup() {
    const store = useStore();
    const router = useRouter();

    const publication = reactive({
      title: '',
      description: '',
      featuredImage: '',
    });

    const save = () => {
      const { title, description, featuredImage } = publication;
      const room = {
        title,
        description,
        featured_image: featuredImage,
        // 'publishedAt' is handled by the store action
      };

      store.dispatch('CREATE_ROOM', room).then(() => {
        router.push({ name: 'SearchPage' });
      });
    };

    return {
      publication,
      save,
    };
  },
  components: {
    PageLayout,
  },
};
</script>
