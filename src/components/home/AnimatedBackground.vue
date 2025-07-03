<template>
  <div class="absolute inset-0 overflow-hidden">
    <div
      v-for="(element, index) in backgroundElements"
      :key="index"
      :class="element.classes"
      :style="getElementStyle(element, index)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAnimations } from '@/composables/useAnimations';

interface BackgroundElement {
  classes: string;
  size: string;
  position: string;
  gradient: string;
  opacity: number;
  delay: number;
}

// Props for customization
interface Props {
  elements?: BackgroundElement[];
}

const props = withDefaults(defineProps<Props>(), {
  elements: () => [],
});

const { getStaggerDelay } = useAnimations();

// Default background elements
const defaultElements: BackgroundElement[] = [
  {
    classes: 'bg-gradient-primary rounded-full animate-float',
    size: 'w-16 h-16',
    position: 'top-20 left-10',
    gradient: 'bg-gradient-primary',
    opacity: 0.15,
    delay: 0,
  },
  {
    classes: 'bg-gradient-secondary rounded-full animate-float',
    size: 'w-12 h-12',
    position: 'top-40 right-20',
    gradient: 'bg-gradient-secondary',
    opacity: 0.20,
    delay: 1.5,
  },
  {
    classes: 'bg-gradient-accent rounded-full animate-float',
    size: 'w-8 h-8',
    position: 'bottom-20 left-1/4',
    gradient: 'bg-gradient-accent',
    opacity: 0.18,
    delay: 2.5,
  },
  {
    classes: 'bg-gradient-primary rounded-full animate-float',
    size: 'w-20 h-20',
    position: 'bottom-40 right-1/4',
    gradient: 'bg-gradient-primary',
    opacity: 0.12,
    delay: 0.8,
  },
  {
    classes: 'bg-gradient-secondary rounded-full animate-float',
    size: 'w-32 h-32',
    position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    gradient: 'bg-gradient-secondary',
    opacity: 0.10,
    delay: 3,
  },
];

const backgroundElements = computed(() =>
  props.elements.length > 0 ? props.elements : defaultElements
);

const getElementStyle = (element: BackgroundElement, index: number) => {
  return {
    animationDelay: `${element.delay}s`,
    opacity: element.opacity,
  };
};
</script>
