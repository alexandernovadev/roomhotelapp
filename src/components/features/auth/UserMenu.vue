<template>
  <Dropdown v-model="isOpen" position="bottom-right">
    <template #trigger>
      <button
        class="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 border border-neutral-200"
      >
        <img
          class="w-8 h-8 rounded-full"
          :src="user.avatar || DEFAULT_AVATAR"
          :alt="`Avatar of ${user.name}`"
        />
        <div class="text-left">
          <p class="text-sm font-medium text-neutral-900">{{ user.name }}</p>
          <p class="text-xs text-neutral-500">{{ user.email }}</p>
        </div>
        <i class="material-icons text-neutral-400 text-sm">
          {{ isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        </i>
      </button>
    </template>

    <template #header>
      <p class="text-sm font-medium text-neutral-900">{{ user.name }}</p>
      <p class="text-sm text-neutral-500">{{ user.email }}</p>
    </template>

    <!-- Opciones del menú -->
    <router-link
      :to="{ name: ROUTES.PROFILE }"
      @click="closeDropdown"
      class="flex items-center pl-4 pr-4 py-3 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
    >
      <i class="material-icons text-neutral-400 mr-3 text-lg">person</i>
      <span>Mi Perfil</span>
    </router-link>

    <router-link
      :to="{ name: ROUTES.HOUSES }"
      @click="closeDropdown"
      class="flex items-center pl-4 pr-4 py-3 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
    >
      <i class="material-icons text-neutral-400 mr-3 text-lg">home</i>
      <span>Mis Habitaciones</span>
    </router-link>

    <router-link
      :to="{ name: ROUTES.CREATE_HOUSE }"
      @click="closeDropdown"
      class="flex items-center pl-4 pr-4 py-3 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
    >
      <i class="material-icons text-neutral-400 mr-3 text-lg">add_circle</i>
      <span>Publicar Habitación</span>
    </router-link>

    <!-- Separador -->
    <div class="border-t border-neutral-100 my-1"></div>

    <!-- Opciones de configuración -->
    <button
      @click="handleSettings"
      class="flex items-center w-full pl-4 pr-4 py-3 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
    >
      <i class="material-icons text-neutral-400 mr-3 text-lg">settings</i>
      <span>Configuración</span>
    </button>

    <button
      @click="handleLogout"
      class="flex items-center w-full pl-4 pr-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
    >
      <i class="material-icons text-red-400 mr-3 text-lg">exit_to_app</i>
      <span>Cerrar Sesión</span>
    </button>
  </Dropdown>
</template>

<script>
import { ref } from 'vue'
import { Dropdown } from '@/components/ui'
import { useAuth } from '@/composables/useAuth'
import { useNotifications } from '@/composables/useNotifications'
import { ROUTES, DEFAULT_AVATAR } from '@/utils/constants'

export default {
  name: 'UserMenu',
  components: {
    Dropdown
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isOpen = ref(false)
    const { logout } = useAuth()
    const { showInfo } = useNotifications()

    const closeDropdown = () => {
      isOpen.value = false
    }

    const handleSettings = () => {
      closeDropdown()
      showInfo('Configuración', 'Funcionalidad de configuración próximamente')
    }

    const handleLogout = () => {
      closeDropdown()
      logout()
    }

    return {
      isOpen,
      closeDropdown,
      handleSettings,
      handleLogout,
      ROUTES,
      DEFAULT_AVATAR
    }
  }
}
</script>
