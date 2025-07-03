import { ref, onMounted } from 'vue';

export function useAnimations() {
  const isVisible = ref(false);
  const animationDelay = ref(0);

  // Animation timing presets
  const animationDelays = {
    immediate: 0,
    short: 0.3,
    medium: 0.6,
    long: 0.9,
    extra: 1.2,
  };

  // Animation classes
  const animationClasses = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    scaleIn: 'animate-scale-in',
    float: 'animate-float',
    pulseGlow: 'animate-pulse-glow',
  };

  // Stagger animation delays for multiple elements
  const getStaggerDelay = (index: number, baseDelay: number = 0.3) => {
    return baseDelay + (index * 0.2);
  };

  // Trigger animation on mount
  const triggerAnimation = (delay: number = 0) => {
    setTimeout(() => {
      isVisible.value = true;
    }, delay * 1000);
  };

  // Auto-trigger animation on mount
  onMounted(() => {
    triggerAnimation(animationDelay.value);
  });

  return {
    isVisible,
    animationDelay,
    animationDelays,
    animationClasses,
    getStaggerDelay,
    triggerAnimation,
  };
}