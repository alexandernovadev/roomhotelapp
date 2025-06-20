<template>
  <div class="flex items-center w-auto">
    <current-user>
      <template v-slot="{ user }">
        <div class="items__controls">
          <div class="flex items-center" v-if="user">
            <!-- Botón New Room -->
            <router-link
              :to="{ name: 'CreateHomePage' }"
              class="no-underline mr-4 flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              <i class="material-icons">add</i>
              <span class="ml-1">New Room</span>
            </router-link>

            <!-- Botón de notificaciones -->
            <button class="mr-4 flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-200">
              <i class="material-icons">notifications</i>
            </button>

            <!-- Menú de usuario -->
            <UserMenu :user="user" />
          </div>

          <!-- Botones de autenticación para usuarios no logueados -->
          <div class="flex items-center space-x-3" v-else>
            <Button
              variant="secondary"
              @click="openLoginModal"
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="primary"
              @click="openRegisterModal"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </template>
    </current-user>
  </div>
</template>

<script>
import { Button } from '@/components/ui'
import { useModal } from '@/composables/useModal'
import { ROUTES } from '@/utils/constants'
import CurrentUser from '@/components/CurrentUser.vue'
import UserMenu from '@/components/features/auth/UserMenu.vue'

export default {
  name: 'Navigation',
  components: {
    Button,
    CurrentUser,
    UserMenu
  },
  emits: ['open-login', 'open-register'],
  setup(props, { emit }) {
    const openLoginModal = () => {
      emit('open-login')
    }

    const openRegisterModal = () => {
      emit('open-register')
    }

    return {
      openLoginModal,
      openRegisterModal,
      ROUTES
    }
  }
}
</script>
