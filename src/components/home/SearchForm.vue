<template>
  <div class="glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto animate-scale-in" :style="{ animationDelay: `${delay}s` }">
    <form @submit.prevent="handleSearch" class="space-y-6">
      <!-- Search Fields -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="relative">
          <input
            v-model="searchData.location"
            type="text"
            placeholder="¿Dónde vas?"
            class="input-professional w-full px-4 py-3 rounded-lg text-white placeholder-white/70 focus:outline-none"
            required
          >
        </div>

        <div class="relative">
          <input
            v-model="searchData.checkIn"
            type="date"
            class="input-professional w-full px-4 py-3 rounded-lg text-white focus:outline-none"
            required
          >
        </div>

        <div class="relative">
          <input
            v-model="searchData.guests"
            type="number"
            placeholder="Huéspedes"
            min="1"
            max="10"
            class="input-professional w-full px-4 py-3 rounded-lg text-white placeholder-white/70 focus:outline-none"
            required
          >
        </div>
      </div>

      <!-- Search Button -->
      <button
        type="submit"
        class="btn-professional w-full text-white font-semibold py-3 px-6 rounded-lg"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">🔍 Buscar Habitaciones</span>
        <span v-else>Buscando...</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface SearchData {
  location: string;
  checkIn: string;
  guests: number;
}

interface Props {
  delay?: number;
  initialData?: Partial<SearchData>;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0.6,
  initialData: () => ({}),
});

const emit = defineEmits<{
  search: [data: SearchData];
}>();

const isLoading = ref(false);

const searchData = reactive<SearchData>({
  location: props.initialData.location || '',
  checkIn: props.initialData.checkIn || '',
  guests: props.initialData.guests || 1,
});

const handleSearch = async () => {
  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    emit('search', { ...searchData });
  } catch (error) {
    console.error('Search error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
