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
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleOverlayClick"
      >
        <!-- Backdrop con blur -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

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
            class="relative w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            :class="modalSizeClasses"
            @click.stop
          >
            <!-- Header del modal -->
            <div
              v-if="showHeader"
              class="flex items-center justify-between p-6 border-b border-gray-100"
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
                    class="text-lg font-semibold text-gray-900"
                  >
                    {{ title }}
                  </h3>
                  <p
                    v-if="subtitle"
                    class="text-sm text-gray-500 mt-1"
                  >
                    {{ subtitle }}
                  </p>
                </div>
              </div>

              <!-- Botón de cerrar -->
              <button
                v-if="showCloseButton"
                @click="closeModal"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors duration-200"
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
              class="flex items-center justify-end space-x-3 p-6 border-t border-gray-50"
            >
              <slot name="footer">
                <Button
                  v-if="showCancelButton"
                  variant="secondary"
                  @click="handleCancel"
                >
                  {{ cancelButtonText }}
                </Button>
                <Button
                  v-if="showConfirmButton"
                  :variant="confirmButtonVariant"
                  @click="handleConfirm"
                >
                  {{ confirmButtonText }}
                </Button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue'
import Button from './Button.vue'

export default {
  name: 'Modal',
  components: {
    Button
  },
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
  emits: ['update:modelValue', 'confirm', 'cancel', 'close'],
  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const modalSizeClasses = computed(() => {
      const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-4xl'
      }
      return sizeClasses[props.size] || sizeClasses.md
    })

    const closeModal = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    const handleCancel = () => {
      emit('cancel')
      closeModal()
    }

    const handleOverlayClick = () => {
      if (props.closeOnOverlayClick) {
        closeModal()
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
        closeModal()
      }
    }

    onMounted(() => {
      if (props.closeOnEscape) {
        document.addEventListener('keydown', handleEscape)
      }
    })

    onUnmounted(() => {
      if (props.closeOnEscape) {
        document.removeEventListener('keydown', handleEscape)
      }
    })

    return {
      isOpen,
      modalSizeClasses,
      closeModal,
      handleConfirm,
      handleCancel,
      handleOverlayClick
    }
  }
}
</script>
