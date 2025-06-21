<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger button -->
    <div @click="toggleDropdown">
      <slot name="trigger" />
    </div>

    <!-- Dropdown menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 min-w-48"
        :class="positionClasses"
      >
        <!-- Header del dropdown (opcional) -->
        <div
          v-if="$slots.header"
          class="pl-4 pr-4 py-3 border-b border-neutral-100 bg-neutral-50 rounded-t-lg"
        >
          <slot name="header" />
        </div>

        <!-- Contenido del dropdown -->
        <div class="py-1">
          <slot />
        </div>

        <!-- Footer del dropdown (opcional) -->
        <div
          v-if="$slots.footer"
          class="pl-4 pr-4 py-3 border-t border-neutral-100 bg-neutral-50 rounded-b-lg"
        >
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Dropdown',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom-right',
      validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit }) {
    const isOpen = ref(props.modelValue)
    const dropdownRef = ref(null)

    const positionClasses = ref({
      'top-left': 'bottom-full right-0 mb-2',
      'top-right': 'bottom-full left-0 mb-2',
      'bottom-left': 'top-full right-0 mt-2',
      'bottom-right': 'top-full left-0 mt-2'
    }[props.position])

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
      emit('update:modelValue', isOpen.value)

      if (isOpen.value) {
        emit('open')
      } else {
        emit('close')
      }
    }

    const closeDropdown = () => {
      if (isOpen.value) {
        isOpen.value = false
        emit('update:modelValue', false)
        emit('close')
      }
    }

    const handleClickOutside = (event) => {
      if (props.closeOnClickOutside && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        closeDropdown()
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen.value) {
        closeDropdown()
      }
    }

    onMounted(() => {
      if (props.closeOnClickOutside) {
        document.addEventListener('click', handleClickOutside)
      }
      document.addEventListener('keydown', handleEscape)
    })

    onUnmounted(() => {
      if (props.closeOnClickOutside) {
        document.removeEventListener('click', handleClickOutside)
      }
      document.removeEventListener('keydown', handleEscape)
    })

    return {
      isOpen,
      dropdownRef,
      positionClasses,
      toggleDropdown,
      closeDropdown
    }
  }
}
</script>
