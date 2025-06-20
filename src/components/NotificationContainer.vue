<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <NotificationToast
      v-for="notification in notifications"
      :key="notification.id"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      :duration="notification.duration"
      :show="notification.show"
      @close="removeNotification(notification.id)"
    />
  </div>
</template>

<script>
import { useNotifications } from '@/composables/useNotifications'
import NotificationToast from './NotificationToast.vue'

export default {
  name: 'NotificationContainer',
  components: {
    NotificationToast
  },
  setup() {
    const { notifications, removeNotification } = useNotifications()

    return {
      notifications,
      removeNotification
    }
  }
}
</script>
