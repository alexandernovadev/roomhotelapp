<template>
  <div class="current-user">
    <slot :user="user"></slot>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CurrentUser',
  setup() {
    const store = useStore();
    const user = computed(() => store.getters['auth/authenticatedUser']);

    return {
      user,
    };
  },
};
</script>
