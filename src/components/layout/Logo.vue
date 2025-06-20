<template>
  <div class="flex items-center flex-shrink-0 mr-6">
    <router-link
      :to="{ name: ROUTES.HOME }"
      class="text-black hover:text-gray-700 no-underline font-semibold text-lg flex items-center"
    >
      <img
        src="@/assets/logonew.png"
        :alt="`${APP_NAME} Logo`"
        class="w-8 h-8 mr-3"
      />
      {{ APP_NAME }}
    </router-link>
  </div>
</template>

<script>
import { ROUTES, APP_NAME } from '@/utils/constants'

export default {
  name: 'Logo',
  setup() {
    return {
      ROUTES,
      APP_NAME
    }
  }
}
</script>
