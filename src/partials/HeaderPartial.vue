<template>
  <header class="bg-white py-5 shadow">
    <div class="container mx-auto">
      <div class="flex items-center justify-between flex-wrap">
        <Logo />
        <Navigation
          @open-login="openLoginModal"
          @open-register="openRegisterModal"
        />
      </div>
    </div>

    <!-- Modal de Login -->
    <Modal
      v-model="loginModal.isOpen.value"
      title="Iniciar Sesión"
      subtitle="Ingresa tus credenciales"
      size="md"
      :show-default-footer="false"
    >
      <LoginForm
        ref="loginFormRef"
        @submit="handleLoginSubmit"
        @cancel="handleLoginCancel"
      />
    </Modal>

    <!-- Modal de Registro -->
    <Modal
      v-model="registerModal.isOpen.value"
      title="Crear Cuenta"
      subtitle="Completa el formulario para registrarte"
      size="lg"
      :show-default-footer="false"
    >
      <RegisterForm
        ref="registerFormRef"
        @submit="handleRegisterSubmit"
        @cancel="handleRegisterCancel"
      />
    </Modal>
  </header>
</template>

<script>
import { ref } from 'vue'
import { Modal, Button } from '@/components/ui'
import { useModal } from '@/composables/useModal'
import { useAuth } from '@/composables/useAuth'
import Logo from '@/components/layout/Logo.vue'
import Navigation from '@/components/layout/Navigation.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'

export default {
  name: 'HeaderPartial',
  components: {
    Modal,
    Button,
    Logo,
    Navigation,
    LoginForm,
    RegisterForm
  },
  setup() {
    const loginModal = useModal()
    const registerModal = useModal()
    const { login, register } = useAuth()

    const loginFormRef = ref(null)
    const registerFormRef = ref(null)
    const isLoggingIn = ref(false)
    const isRegistering = ref(false)

    const openLoginModal = () => {
      loginModal.openModal()
    }

    const openRegisterModal = () => {
      registerModal.openModal()
    }

    const handleLoginSubmit = async (formData) => {
      if (!formData) return

      isLoggingIn.value = true
      try {
        await login({
          email: formData.email,
          password: formData.password
        })
        loginModal.closeModal()
      } catch (error) {
        console.error('HeaderPartial: Login error:', error)
      } finally {
        isLoggingIn.value = false
      }
    }

    const handleLoginCancel = () => {
      loginModal.closeModal()
    }

    const handleRegisterSubmit = async (formData) => {
      if (!formData) return

      isRegistering.value = true

      try {
        await register({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          phone: formData.phone
        })

        registerModal.closeModal()
      } catch (error) {
        console.error('HeaderPartial: Register error:', error)
      } finally {
        isRegistering.value = false
      }
    }

    const handleRegisterCancel = () => {
      registerModal.closeModal()
    }

    return {
      loginModal,
      registerModal,
      loginFormRef,
      registerFormRef,
      isLoggingIn,
      isRegistering,
      openLoginModal,
      openRegisterModal,
      handleLoginSubmit,
      handleLoginCancel,
      handleRegisterSubmit,
      handleRegisterCancel
    }
  }
}
</script>
