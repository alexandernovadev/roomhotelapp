<template>
  <header class="bg-white py-5 shadow">
    <div class="container mx-auto">
      <div class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-shrink-0 mr-6">
          <router-link
            :to="{ name: 'HomePage' }"
            class="text-black hover:text-gray-700 no-underline font-semibold text-lg"
          >
            Adventures App
          </router-link>
        </div>
        <div class="flex items-center w-auto">
          <current-user>
            <template v-slot="{ user }">
              <div class="items__controls">
                <div class="flex items-center" v-if="user">
                  <router-link
                    :to="{ name: 'CreateHousePage' }"
                    class="no-underline mr-4 flex items-center text-gray-800 hover:text-gray-600"
                  >
                    <i class="material-icons">add</i>
                    <span class="ml-1">New Room</span>
                  </router-link>
                  <button class="mr-4 flex items-center text-gray-800 hover:text-gray-600">
                    <i class="material-icons">notifications</i>
                  </button>
                  <div class="flex items-center mr-4">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      :src="user.avatar || 'https://avatars2.githubusercontent.com/u/1901273?s=460&v=4'"
                      :alt="`Avatar of ${user.name}`"
                    />
                    <div class="text-sm">
                      <p class="text-black leading-none">{{ user.name }}</p>
                      <p class="text-gray-600">Online</p>
                    </div>
                  </div>
                  <button class="flex items-center text-gray-800 hover:text-gray-600" @click="logOut">
                    <i class="material-icons">exit_to_app</i>
                  </button>
                </div>

                <div class="flex items-center space-x-3" v-else>
                  <button
                    @click="openLoginModal"
                    class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 font-medium"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    @click="openRegisterModal"
                    class="px-4 py-2 text-white bg-cyan-600 border border-transparent rounded-lg hover:bg-cyan-700 transition-colors duration-200 font-medium"
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </template>
          </current-user>
        </div>
      </div>
    </div>

    <!-- Modal de Registro -->
    <SharedModal
      v-model="registerModalOpen"
      title="Crear Cuenta"
      subtitle="Completa el formulario para registrarte"
      size="lg"
      :show-default-footer="true"
      confirm-button-text="Registrarse"
      cancel-button-text="Cancelar"
      @confirm="handleRegisterSubmit"
      @cancel="handleRegisterCancel"
    >
      <form @submit.prevent="handleRegisterSubmit" class="space-y-4">
        <div>
          <label for="register-name" class="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            id="register-name"
            v-model="registerForm.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        <div>
          <label for="register-email" class="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="register-email"
            v-model="registerForm.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label for="register-password" class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="register-password"
            v-model="registerForm.password"
            type="password"
            required
            minlength="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div>
          <label for="register-confirm-password" class="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <input
            id="register-confirm-password"
            v-model="registerForm.confirmPassword"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Confirma tu contraseña"
          />
        </div>

        <div>
          <label for="register-phone" class="block text-sm font-medium text-gray-700 mb-1">
            Teléfono (opcional)
          </label>
          <input
            id="register-phone"
            v-model="registerForm.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div class="flex items-center">
          <input
            id="register-terms"
            v-model="registerForm.terms"
            type="checkbox"
            required
            class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label for="register-terms" class="ml-2 block text-sm text-gray-700">
            Acepto los <a href="#" class="text-cyan-600 hover:text-cyan-700 underline">términos y condiciones</a>
          </label>
        </div>
      </form>
    </SharedModal>

    <!-- Modal de Login -->
    <SharedModal
      v-model="loginModalOpen"
      title="Iniciar Sesión"
      subtitle="Ingresa tus credenciales"
      size="md"
      :show-default-footer="true"
      confirm-button-text="Iniciar Sesión"
      cancel-button-text="Cancelar"
      @confirm="handleLoginSubmit"
      @cancel="handleLoginCancel"
    >
      <form @submit.prevent="handleLoginSubmit" class="space-y-4">
        <div>
          <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="login-email"
            v-model="loginForm.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="login-password"
            v-model="loginForm.password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Tu contraseña"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="login-remember"
              v-model="loginForm.remember"
              type="checkbox"
              class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label for="login-remember" class="ml-2 block text-sm text-gray-700">
              Recordarme
            </label>
          </div>
          <a href="#" class="text-sm text-cyan-600 hover:text-cyan-700">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </SharedModal>
  </header>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import CurrentUser from '../components/CurrentUser.vue';
import SharedModal from '../components/SharedModal.vue';

export default {
  name: 'HeaderPartial',
  components: {
    CurrentUser,
    SharedModal,
  },

  setup() {
    const store = useStore();

    // Estados de los modales
    const registerModalOpen = ref(false);
    const loginModalOpen = ref(false);

    // Datos del formulario de registro
    const registerForm = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      terms: false
    });

    // Datos del formulario de login
    const loginForm = reactive({
      email: '',
      password: '',
      remember: false
    });

    const logOut = () => {
      store.dispatch('LOG_OUT');
    };

    // Métodos para abrir modales
    const openLoginModal = () => {
      loginModalOpen.value = true;
    };

    const openRegisterModal = () => {
      registerModalOpen.value = true;
    };

    // Handlers de eventos
    const handleRegisterSubmit = () => {
      console.log('Formulario de registro enviado:', registerForm);

      // Validar que las contraseñas coincidan
      if (registerForm.password !== registerForm.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      // Aquí puedes implementar la lógica de registro
      alert('Registro exitoso! (Funcionalidad pendiente)');
      registerModalOpen.value = false;

      // Resetear formulario
      Object.assign(registerForm, {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        terms: false
      });
    };

    const handleRegisterCancel = () => {
      console.log('Registro cancelado');
      // Resetear formulario
      Object.assign(registerForm, {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        terms: false
      });
    };

    const handleLoginSubmit = () => {
      console.log('Formulario de login enviado:', loginForm);

      // Aquí puedes implementar la lógica de login
      alert('Login exitoso! (Funcionalidad pendiente)');
      loginModalOpen.value = false;

      // Resetear formulario
      Object.assign(loginForm, {
        email: '',
        password: '',
        remember: false
      });
    };

    const handleLoginCancel = () => {
      console.log('Login cancelado');
      // Resetear formulario
      Object.assign(loginForm, {
        email: '',
        password: '',
        remember: false
      });
    };

    return {
      logOut,
      registerModalOpen,
      loginModalOpen,
      registerForm,
      loginForm,
      openLoginModal,
      openRegisterModal,
      handleRegisterSubmit,
      handleRegisterCancel,
      handleLoginSubmit,
      handleLoginCancel,
    };
  },
};
</script>
