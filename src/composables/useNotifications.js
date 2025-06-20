import { ref } from 'vue'

const notifications = ref([])
let nextId = 1

export function useNotifications() {
  const showNotification = ({ type = 'info', title, message = '', duration = 5000 }) => {
    const id = nextId++
    const notification = {
      id,
      type,
      title,
      message,
      duration,
      show: true
    }

    notifications.value.push(notification)

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const showSuccess = (title, message = '') => {
    return showNotification({ type: 'success', title, message })
  }

  const showError = (title, message = '') => {
    return showNotification({ type: 'error', title, message })
  }

  const showWarning = (title, message = '') => {
    return showNotification({ type: 'warning', title, message })
  }

  const showInfo = (title, message = '') => {
    return showNotification({ type: 'info', title, message })
  }

  return {
    notifications,
    showNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
