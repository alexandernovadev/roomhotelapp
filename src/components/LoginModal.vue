<template>
  <Modal :show="show" @close="closeModal">
    <template #header>
      Sign In
    </template>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter your password"
        />
      </div>

      <div class="flex items-center">
        <input
          id="remember"
          v-model="form.rememberMe"
          type="checkbox"
          class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label for="remember" class="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>
    </form>

    <template #footer>
      <button
        @click="closeModal"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        Cancel
      </button>
      <button
        @click="handleSubmit"
        :disabled="loading"
        class="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </template>
  </Modal>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import Modal from './Modal.vue';

export default {
  name: 'LoginModal',
  components: {
    Modal,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const loading = ref(false);

    const form = reactive({
      email: '',
      password: '',
      rememberMe: false,
    });

    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = async () => {
      loading.value = true;
      try {
        await store.dispatch('SIGN_IN', {
          email: form.email,
          password: form.password,
        });
        closeModal();
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      closeModal,
      handleSubmit,
    };
  },
};
</script>
