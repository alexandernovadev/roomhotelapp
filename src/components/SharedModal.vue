<template>
  <Teleport to="body">
    <!-- Overlay con animación de fade -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="handleOverlayClick"
      >
        <!-- Backdrop con blur -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal container con animación de escala y slide -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            :class="modalSizeClasses"
            @click.stop
          >
            <!-- Header del modal -->
            <div
              v-if="showHeader"
              class="flex items-center justify-between p-6 border-b border-neutral-100"
              :class="headerClasses"
            >
              <div class="flex items-center space-x-3">
                <div
                  v-if="icon"
                  class="flex items-center justify-center w-10 h-10 rounded-full"
                  :class="iconClasses"
                >
                  <component :is="icon" class="w-5 h-5" />
                </div>
                <div>
                  <h3
                    v-if="title"
                    class="text-lg font-semibold text-neutral-900"
                  >
                    {{ title }}
                  </h3>
                  <p
                    v-if="subtitle"
                    class="text-sm text-neutral-500 mt-1"
                  >
                    {{ subtitle }}
                  </p>
                </div>
              </div>

              <!-- Botón de cerrar -->
              <button
                v-if="showCloseButton"
                @click="closeModal"
                class="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                :aria-label="closeButtonLabel"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Contenido del modal -->
            <div class="p-6">
              <slot />
            </div>

            <!-- Footer del modal -->
            <div
              v-if="$slots.footer || showDefaultFooter"
              class="flex items-center justify-end space-x-3 p-6 border-t border-neutral-100 bg-neutral-50"
            >
              <slot name="footer">
                <button
                  v-if="showCancelButton"
                  @click="handleCancel"
                  class="pl-4 pr-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {{ cancelButtonText }}
                </button>
                <button
                  v-if="showConfirmButton"
                  @click="handleConfirm"
                  class="pl-4 pr-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200"
                  :class="confirmButtonClasses"
                >
                  {{ confirmButtonText }}
                </button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SharedModal',
  props: {
    // Estado del modal
    modelValue: {
      type: Boolean,
      default: false
    },

    // Configuración del header
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: [String, Object],
      default: null
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    closeButtonLabel: {
      type: String,
      default: 'Cerrar'
    },

    // Configuración del tamaño
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },

    // Configuración del footer
    showDefaultFooter: {
      type: Boolean,
      default: false
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: 'Cancelar'
    },
    confirmButtonText: {
      type: String,
      default: 'Confirmar'
    },
    confirmButtonVariant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value)
    },

    // Configuración de comportamiento
    closeOnOverlayClick: {
      type: Boolean,
      default: true
    },
    closeOnEscape: {
      type: Boolean,
      default: true
    },

    // Clases personalizadas
    headerClasses: {
      type: String,
      default: ''
    },
    iconClasses: {
      type: String,
      default: 'bg-cyan-100 text-cyan-600'
    }
  },

  emits: [
    'update:modelValue',
    'confirm',
    'cancel',
    'close'
  ],

  setup(props, { emit }) {
    // Computed properties
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const modalSizeClasses = computed(() => {
      const sizeMap = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-4xl'
      }
      return sizeMap[props.size] || sizeMap.md
    })

    const confirmButtonClasses = computed(() => {
      const variantMap = {
        primary: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500',
        success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
        warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      }
      return variantMap[props.confirmButtonVariant] || variantMap.primary
    })

    // Methods
    const closeModal = () => {
      isOpen.value = false
      emit('close')
    }

    const handleOverlayClick = () => {
      if (props.closeOnOverlayClick) {
        closeModal()
      }
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    const handleCancel = () => {
      emit('cancel')
      closeModal()
    }

    // Keyboard event handler
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
        closeModal()
      }
    }

    // Lifecycle
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown)
    }

    return {
      isOpen,
      modalSizeClasses,
      confirmButtonClasses,
      closeModal,
      handleOverlayClick,
      handleConfirm,
      handleCancel
    }
  }
}
</script>

<style scoped>
/* Estilos adicionales para mejorar la experiencia */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

/* Scroll personalizado para el contenido */
.modal-content {
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

/* Animación de pulse para el botón de confirmar */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.confirm-button:focus {
  animation: pulse 0.2s ease-in-out;
}
</style>
