import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)

  const openModal = () => {
    console.log('useModal: openModal called, setting isOpen to true')
    isOpen.value = true
    console.log('useModal: isOpen is now:', isOpen.value)
  }

  const closeModal = () => {
    console.log('useModal: closeModal called, setting isOpen to false')
    isOpen.value = false
    console.log('useModal: isOpen is now:', isOpen.value)
  }

  const toggleModal = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  }
}
