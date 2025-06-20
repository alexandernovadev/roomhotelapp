<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="isVisible"
        class="fixed top-4 right-4 z-50 max-w-sm w-full"
      >
        <div
          class="rounded-lg shadow-lg p-4 border-l-4"
          :class="notificationClasses"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="icon" class="w-5 h-5" />
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium" :class="titleClasses">
                {{ title }}
              </p>
              <p class="mt-1 text-sm" :class="messageClasses">
                {{ message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="close"
                class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { ref, computed, onMounted, h } from 'vue'

// Iconos para diferentes tipos de notificación
const SuccessIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  }
}

const ErrorIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  }
}

const WarningIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
      })
    ])
  }
}

const InfoIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  }
}

export default {
  name: 'NotificationToast',
  components: {
    SuccessIcon,
    ErrorIcon,
    WarningIcon,
    InfoIcon
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 5000
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isVisible = ref(props.show)
    let timeoutId = null

    const icon = computed(() => {
      const iconMap = {
        success: 'SuccessIcon',
        error: 'ErrorIcon',
        warning: 'WarningIcon',
        info: 'InfoIcon'
      }
      return iconMap[props.type] || 'InfoIcon'
    })

    const notificationClasses = computed(() => {
      const baseClasses = 'bg-white'
      const borderClasses = {
        success: 'border-green-500',
        error: 'border-red-500',
        warning: 'border-yellow-500',
        info: 'border-cyan-500'
      }
      return `${baseClasses} ${borderClasses[props.type]}`
    })

    const titleClasses = computed(() => {
      const colorClasses = {
        success: 'text-green-800',
        error: 'text-red-800',
        warning: 'text-yellow-800',
        info: 'text-cyan-800'
      }
      return colorClasses[props.type]
    })

    const messageClasses = computed(() => {
      const colorClasses = {
        success: 'text-green-700',
        error: 'text-red-700',
        warning: 'text-yellow-700',
        info: 'text-cyan-700'
      }
      return colorClasses[props.type]
    })

    const close = () => {
      isVisible.value = false
      emit('close')
    }

    const showNotification = () => {
      isVisible.value = true

      if (props.duration > 0) {
        timeoutId = setTimeout(() => {
          close()
        }, props.duration)
      }
    }

    onMounted(() => {
      if (props.show) {
        showNotification()
      }
    })

    return {
      isVisible,
      icon,
      notificationClasses,
      titleClasses,
      messageClasses,
      close,
      showNotification
    }
  }
}
</script>
