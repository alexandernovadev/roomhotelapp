<template>
  <div class="default-layout">
    <header-partial></header-partial>
    <section class="py-6 bg-black bg-cover bg-center min-h-[250px] sm:min-h-[450px]"
             style="background-image: url('https://images.unsplash.com/photo-1504202302068-15fc2055f7f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80');">
      <div class="container mx-auto px-4">
        <div class="bg-white p-6 w-full max-w-md mx-auto shadow-lg rounded-lg">
          <h1 class="mb-3 text-3xl font-light text-gray-800">
            Find homes on Adventures App
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

    <!-- Modern Modals -->
    <LoginModal
      :show="modals.login"
      @close="closeModalLogin"
    />
    <RegisterModal
      :show="modals.register"
      @close="closeModalRegister"
    />
  </div>
</template>

<script>
import { useModals } from '@/composables/useModals';
import HeaderPartial from '@/partials/HeaderPartial.vue';
import FooterPartial from '@/partials/FooterPartial.vue';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'DefaultLayout',
  setup() {
    const { modals, closeModal } = useModals();

    const closeModalRegister = () => {
      closeModal('register');
    };

    const closeModalLogin = () => {
      closeModal('login');
    };

    return {
      modals,
      closeModalLogin,
      closeModalRegister,
    };
  },
  components: {
    HeaderPartial,
    FooterPartial,
    LoginModal,
    RegisterModal,
  },
};
</script>
