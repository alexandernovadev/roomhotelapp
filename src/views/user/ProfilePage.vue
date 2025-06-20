<template>
  <page-layout>
    <section class="py-4 bg-cyan-700">
      <div class="container mx-auto">
        <form class="form">
          <div class="form__field relative">
            <i class="input-icon material-icons absolute text-gray-500">search</i>
            <input class="input__search" id="where" type="text" placeholder="New York" />
          </div>
        </form>
      </div>
    </section>
    <section class="section__profile py-6">
      <div class="container mx-auto">
        <h1 class="text-3xl font-light m-3">Profile Account</h1>
        <div class="grid grid-cols-12 gap-4">
          <aside class="col-span-3 px-3">
            <div class="profile__card">
              <div class="profile__thumbnail">
                <img class="profile__image w-full" :src="profile.avatar" alt="User Avatar" />
              </div>
              <p class="text-center">
                <b>{{ userRoomsCount }} rooms</b>
              </p>
            </div>
          </aside>
          <div class="col-span-9">
            <form @submit.prevent="saveProfile">
              <div class="mb-4">
                <label class="input__label" for="name">Name</label>
                <div class="form__field relative">
                  <input
                    v-model="profile.name"
                    class="input__field"
                    id="name"
                    type="text"
                    placeholder="Bruce Wayne"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="input__label" for="username">Username</label>
                <div class="form__field relative">
                  <input
                    v-model="profile.username"
                    class="input__field"
                    id="username"
                    type="text"
                    placeholder="bruce.wayne"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="input__label" for="avatar">Avatar</label>
                <div class="form__field relative">
                  <input
                    v-model="profile.avatar"
                    class="input__field"
                    id="avatar"
                    type="text"
                    placeholder="https://avatars1.githubusercontent.com/u/9919?s=500&v=4"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="input__label" for="email">Email</label>
                <div class="form__field relative">
                  <input
                    class="input__field"
                    id="email"
                    v-model="profile.email"
                    type="text"
                    placeholder="bruce.wayne@imnotbatman.org"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="input__label" for="bio">Bio</label>
                <div class="form__field relative">
                  <textarea
                    class="input__field"
                    rows="5"
                    v-model="profile.bio"
                    id="bio"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>
              </div>
              <div class="flex items-center w-auto mb-4">
                <button type="button" class="px-4 py-2 border rounded mr-3">Cancel</button>
                <button type="submit" class="bg-cyan-500 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-600 transition-colors duration-200">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </page-layout>
</template>

<script>
import { reactive, computed, watch } from 'vue';
import { useStore } from 'vuex';
import PageLayout from '@/layouts/PageLayout.vue';

export default {
  name: 'ProfilePage',
  setup() {
    const store = useStore();

    const user = computed(() => store.getters.authUser);

    const profile = reactive({
      name: '',
      username: '',
      avatar: '',
      email: '',
      bio: '',
    });

    watch(user, (newUser) => {
      if (newUser) {
        Object.assign(profile, newUser);
      }
    }, { immediate: true });

    const userRoomsCount = computed(() => {
      if (user.value) {
        return store.getters.userRoomsCount(user.value['.key']);
      }
      return 0;
    });

    const saveProfile = () => {
      // Here you would dispatch an action to update the user profile
      // For example: store.dispatch('UPDATE_USER_PROFILE', profile);
      console.log('Saving profile...', profile);
    };

    return {
      profile,
      userRoomsCount,
      saveProfile,
    };
  },
  components: {
    PageLayout,
  },
};
</script>
