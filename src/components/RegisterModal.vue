<template>
  <Modal :show="show" @close="closeModal">
    <template #header>
      Create Account
    </template>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter your full name"
        />
      </div>

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
          minlength="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Enter your password (min 6 characters)"
        />
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
        {{ loading ? 'Creating account...' : 'Create Account' }}
      </button>
    </template>
  </Modal>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import Modal from './Modal.vue';

export default {
  name: 'RegisterModal',
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
      name: '',
      email: '',
      password: '',
    });

    const closeModal = () => {
      emit('close');
    };

    const handleSubmit = async () => {
      loading.value = true;
      try {
        await store.dispatch('CREATE_USER', form);
        closeModal();
      } catch (error) {
        console.error('Registration error:', error);
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
