import { computed } from 'vue';
import { useStore } from 'vuex';

export function useModals() {
  const store = useStore();

  const modals = computed(() => store.getters.modals);

  const openModal = (modalName) => {
    // Close all other modals first
    Object.keys(modals.value).forEach(name => {
      if (name !== modalName) {
        store.dispatch('TOGGLE_MODAL_STATE', {
          name,
          value: false,
        });
      }
    });

    // Open the requested modal
    store.dispatch('TOGGLE_MODAL_STATE', {
      name: modalName,
      value: true,
    });
  };

  const closeModal = (modalName) => {
    store.dispatch('TOGGLE_MODAL_STATE', {
      name: modalName,
      value: false,
    });
  };

  const closeAllModals = () => {
    Object.keys(modals.value).forEach(name => {
      store.dispatch('TOGGLE_MODAL_STATE', {
        name,
        value: false,
      });
    });
  };

  const isModalOpen = (modalName) => {
    return modals.value[modalName] || false;
  };

  const activeModal = computed(() => {
    const openModals = Object.entries(modals.value).filter(([_, isOpen]) => isOpen);
    return openModals.length > 0 ? openModals[0][0] : null;
  });

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    activeModal,
  };
}
