<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="uniqueId"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :id="uniqueId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <i class="material-icons" :class="iconClasses">{{ icon }}</i>
      </div>
      <div
        v-if="error"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <i class="material-icons text-red-500 text-sm">error</i>
      </div>
    </div>
    <p
      v-if="error"
      class="mt-1 text-sm text-red-600"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helpText"
      class="mt-1 text-sm"
      :class="helpTextClasses"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Input',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    minlength: {
      type: [String, Number],
      default: null
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'on-dark'].includes(value)
    }
  },
  emits: ['update:modelValue', 'blur', 'focus'],
  setup(props, { emit }) {
    // Generar ID único si no se proporciona uno
    const uniqueId = computed(() => {
      if (props.id) return props.id
      return `input-${Math.random().toString(36).substr(2, 9)}`
    })

    const isDarkMode = computed(() => props.variant === 'on-dark');

    const labelClasses = computed(() => {
      return isDarkMode.value
        ? 'block text-sm font-medium text-white mb-1'
        : 'block text-sm font-medium text-neutral-700 mb-1'
    })

    const inputClasses = computed(() => {
      let baseClasses = 'w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

      if (isDarkMode.value) {
        baseClasses += ' bg-white/90 border-white/40 text-neutral-800 placeholder-neutral-500'
      } else {
        baseClasses += ' bg-white text-neutral-900 placeholder-neutral-400'
      }

      const sizeClasses = {
        sm: 'pl-3 pr-3 py-1.5 text-sm',
        md: 'pl-3 pr-3 py-2 text-sm',
        lg: 'pl-4 pr-4 py-3 text-base'
      }

      const stateClasses = props.error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : isDarkMode.value
          ? 'focus:border-white focus:ring-white'
          : 'border-neutral-300 focus:border-cyan-500 focus:ring-cyan-500'

      const iconPadding = props.icon ? 'pl-10' : ''
      const errorPadding = props.error ? 'pr-10' : ''

      return `${baseClasses} ${sizeClasses[props.size]} ${stateClasses} ${iconPadding} ${errorPadding}`
    })

    const iconClasses = computed(() => {
      return isDarkMode.value ? 'text-neutral-600' : 'text-neutral-400'
    })

    const helpTextClasses = computed(() => {
      return isDarkMode.value ? 'text-neutral-200' : 'text-neutral-500'
    })

    const handleInput = (event) => {
      emit('update:modelValue', event.target.value)
    }

    const handleBlur = (event) => {
      emit('blur', event)
    }

    const handleFocus = (event) => {
      emit('focus', event)
    }

    return {
      uniqueId,
      labelClasses,
      inputClasses,
      iconClasses,
      helpTextClasses,
      handleInput,
      handleBlur,
      handleFocus
    }
  }
}
</script>
