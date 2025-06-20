<template>
  <div class="default-layout">
    <header-partial></header-partial>
    <section class="py-6 bg-black bg-cover bg-center min-h-[250px] sm:min-h-[450px]"
             style="background-image: url('https://images.unsplash.com/photo-1504202302068-15fc2055f7f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80');">
      <div class="container mx-auto px-4">
        <div class="bg-white p-6 w-full max-w-md mx-auto shadow-lg rounded-lg">
          <h1 class="mb-3 text-3xl font-light text-gray-800">
            Find homes on Adeventures Rooms
          </h1>
          <h2 class="mb-6 text-sm text-gray-600 font-normal">
            Discover entire homes and private rooms perfect for any trip.
          </h2>
          <form class="form__search" @submit.prevent>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2" for="where">Where</label>
              <div class="relative">
                <i class="material-icons absolute top-3 left-3 text-gray-400">search</i>
                <input
                  class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  id="where"
                  type="text"
                  placeholder="Mexico City, Mexico"
                />
              </div>
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-yellow-400 font-semibold rounded-lg text-yellow-800 hover:bg-yellow-500 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
    <main class="main">
      <slot></slot>
    </main>
    <footer-partial></footer-partial>
    <!-- Modals -->
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import HeaderPartial from '@/partials/HeaderPartial.vue';
import FooterPartial from '@/partials/FooterPartial.vue';
// import Modal from '@/components/Modal.vue';

export default {
  name: 'DefaultLayout',
  setup() {
    const store = useStore();

    const formLogin = reactive({
      email: '',
      password: '',
      rememberMe: false,
    });

    const formRegister = reactive({
      email: '',
      name: '',
      password: '',
    });

    const modals = computed(() => store.getters.modals);

    const closeModal = () => {
      store.dispatch('TOGGLE_MODAL_STATE', {
        name: 'login',
        value: false,
      });
    };

    const closeModalRegister = () => {
      store.dispatch('TOGGLE_MODAL_STATE', {
        name: 'register',
        value: false,
      });
    };

    const registerHandlerSubmit = () => {
      store.dispatch('CREATE_USER', formRegister).then(() => {
        closeModalRegister();
      });
    };

    const loginHandlerSubmit = () => {
      store.dispatch('SIGN_IN', {
        email: formLogin.email,
        password: formLogin.password,
      }).then(() => {
        closeModal();
      });
    };

    return {
      formLogin,
      formRegister,
      modals,
      closeModal,
      closeModalRegister,
      registerHandlerSubmit,
      loginHandlerSubmit,
    };
  },
  components: {
    HeaderPartial,
    FooterPartial,
  },
};
</script>
