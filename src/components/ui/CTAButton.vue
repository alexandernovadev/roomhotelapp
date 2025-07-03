<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="flex items-center justify-center">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      {{ loadingText }}
    </span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  loadingText: 'Cargando...',
  disabled: false,
  delay: 0,
});

const emit = defineEmits<{
  click: [];
}>();

const buttonClasses = computed(() => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105';

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  const variantClasses = {
    primary: 'btn-professional text-white',
    secondary: 'bg-gradient-secondary text-white',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900',
  };

  return `${baseClasses} ${sizeClasses[props.size]} ${variantClasses[props.variant]}`;
});

const handleClick = () => {
  if (!props.loading && !props.disabled) {
    emit('click');
  }
};
</script>
