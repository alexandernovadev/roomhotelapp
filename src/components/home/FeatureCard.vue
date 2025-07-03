<template>
  <div
    class="glass rounded-xl p-6 text-center card-float animate-fade-in"
    :style="{ animationDelay: `${delay}s` }"
  >
    <div class="text-3xl mb-4">{{ icon }}</div>
    <h3 class="text-white font-semibold mb-2 text-lg">{{ title }}</h3>
    <p class="text-white/80 text-sm leading-relaxed">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
});
</script>
