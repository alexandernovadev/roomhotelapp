<template>
  <header class="bg-white py-5 shadow">
    <div class="container mx-auto">
      <div class="flex items-center justify-between flex-wrap">
        <Logo />
        <Navigation
          @open-login="openLoginModal"
          @open-register="openRegisterModal"
        />

        <!-- Test button for debugging -->
        <button
          @click="openLoginModal"
          class="ml-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Test Login Modal
        </button>
      </div>
    </div>

    <!-- Modal de Login -->
    <Modal
      v-model="loginModal.isOpen"
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
      v-model="registerModal.isOpen"
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
      console.log('openLoginModal called')
      loginModal.openModal()
      console.log('loginModal.isOpen:', loginModal.isOpen.value)
    }

    const openRegisterModal = () => {
      console.log('openRegisterModal called')
      registerModal.openModal()
      console.log('registerModal.isOpen:', registerModal.isOpen.value)
    }

    const handleLoginSubmit = async () => {
      if (!loginFormRef.value) return

      isLoggingIn.value = true
      try {
        const formData = loginFormRef.value.form
        await login({
          email: formData.email,
          password: formData.password
        })
        loginModal.closeModal()
      } catch (error) {
        console.error('Login error:', error)
      } finally {
        isLoggingIn.value = false
      }
    }

    const handleLoginCancel = () => {
      loginModal.closeModal()
    }

    const handleRegisterSubmit = async () => {
      console.log('HeaderPartial: handleRegisterSubmit called')
      if (!registerFormRef.value) {
        console.log('HeaderPartial: registerFormRef is null')
        return
      }

      isRegistering.value = true
      console.log('HeaderPartial: isRegistering set to true')

      try {
        const formData = registerFormRef.value.form
        console.log('HeaderPartial: formData:', formData)

        await register({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          phone: formData.phone
        })

        console.log('HeaderPartial: register successful, closing modal')
        registerModal.closeModal()
      } catch (error) {
        console.error('HeaderPartial: Register error:', error)
      } finally {
        console.log('HeaderPartial: isRegistering set to false')
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
