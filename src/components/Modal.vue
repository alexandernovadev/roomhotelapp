<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">
                <slot name="header">Modal Title</slot>
              </h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <i class="material-icons">close</i>
              </button>
            </div>

            <!-- Content -->
            <div class="p-6">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && props.show) {
        closeModal();
      }
    };

    const preventBodyScroll = () => {
      if (props.show) {
        document.body.style.overflow = 'hidden';
      }
    };

    const restoreBodyScroll = () => {
      document.body.style.overflow = '';
    };

    onMounted(() => {
      document.addEventListener('keydown', handleEscape);
      if (props.show) {
        preventBodyScroll();
      }
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
      restoreBodyScroll();
    });

    return {
      closeModal,
    };
  },
  watch: {
    show(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
