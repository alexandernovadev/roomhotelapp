<template>
  <header class="bg-white py-5 shadow">
    <div class="container mx-auto">
      <div class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-shrink-0 mr-6">
          <router-link
            :to="{ name: 'HomePage' }"
            class="text-black hover:text-gray-700 no-underline font-semibold text-lg"
          >
            Adventures App
          </router-link>
        </div>
        <div class="flex items-center w-auto">
          <current-user>
            <template v-slot="{ user }">
              <div class="items__controls">
                <div class="flex items-center" v-if="user">
                  <router-link
                    :to="{ name: 'CreateHousePage' }"
                    class="no-underline mr-4 flex items-center text-gray-800 hover:text-gray-600"
                  >
                    <i class="material-icons">add</i>
                    <span class="ml-1">New Room</span>
                  </router-link>
                  <button class="mr-4 flex items-center text-gray-800 hover:text-gray-600">
                    <i class="material-icons">notifications</i>
                  </button>
                  <div class="flex items-center mr-4">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      :src="user.avatar || 'https://avatars2.githubusercontent.com/u/1901273?s=460&v=4'"
                      :alt="`Avatar of ${user.name}`"
                    />
                    <div class="text-sm">
                      <p class="text-black leading-none">{{ user.name }}</p>
                      <p class="text-gray-600">Online</p>
                    </div>
                  </div>
                  <button class="flex items-center text-gray-800 hover:text-gray-600" @click="logOut">
                    <i class="material-icons">exit_to_app</i>
                  </button>
                </div>
                <div v-else>
                  <button
                    class="px-4 py-2 border border-teal-500 text-teal-500 rounded hover:bg-teal-500 hover:text-white mr-2"
                    @click="getLogin"
                  >
                    Login
                  </button>
                  <button
                    @click="signUp"
                    class="bg-yellow-400 text-yellow-800 font-semibold py-2 px-4 rounded hover:bg-yellow-500"
                  >
                    Register
                  </button>
                </div>
              </div>
            </template>
          </current-user>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from 'vuex';
import CurrentUser from '../components/CurrentUser.vue';

export default {
  name: 'HeaderPartial',
  setup() {
    const store = useStore();

    const getLogin = () => {
      store.dispatch('TOGGLE_MODAL_STATE', {
        name: 'login',
        value: true,
      });
    };

    const signUp = () => {
      store.dispatch('TOGGLE_MODAL_STATE', {
        name: 'register',
        value: true,
      });
    };

    const logOut = () => {
      store.dispatch('LOG_OUT');
    };

    return {
      getLogin,
      signUp,
      logOut,
    };
  },
  components: {
    CurrentUser,
  },
};
</script>
