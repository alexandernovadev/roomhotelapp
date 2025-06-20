<template>
  <header class="bg-white py-5 shadow">
    <div class="container mx-auto">
      <div class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-shrink-0 mr-6">
          <router-link
            :to="{ name: 'HomePage' }"
            class="text-black hover:text-gray-700 no-underline font-semibold text-lg flex items-center"
          >
            <img
              src="@/assets/logonew.png"
              alt="Adventures App Logo"
              class="w-8 h-8 mr-3"
            />
            Adventures App
          </router-link>
        </div>
        <div class="flex items-center w-auto">
          <current-user>
            <template v-slot="{ user }">
              <div class="items__controls">
                <div class="flex items-center" v-if="user">
                  <router-link
                    :to="{ name: 'CreateHomePage' }"
                    class="no-underline mr-4 flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-200"
                  >
                    <i class="material-icons">add</i>
                    <span class="ml-1">New Room</span>
                  </router-link>
                  <button class="mr-4 flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-200">
                    <i class="material-icons">notifications</i>
                  </button>

                  <!-- Menú de usuario -->
                  <div class="relative user-menu">
                    <button
                      @click="toggleUserMenu"
                      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                    >
                      <img
                        class="w-8 h-8 rounded-full"
                        :src="user.avatar || 'https://avatars2.githubusercontent.com/u/1901273?s=460&v=4'"
                        :alt="`Avatar of ${user.name}`"
                      />
                      <div class="text-left">
                        <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                        <p class="text-xs text-gray-500">{{ user.email }}</p>
                      </div>
                      <i class="material-icons text-gray-400 text-sm">
                        {{ userMenuOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
                      </i>
                    </button>

                    <!-- Dropdown menu -->
                    <div
                      v-if="userMenuOpen"
                      class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                      style="min-width: 250px;"
                    >
                      <!-- Header del dropdown -->
                      <div class="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                        <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                        <p class="text-sm text-gray-500">{{ user.email }}</p>
                      </div>

                      <!-- Opciones del menú -->
                      <div class="py-1">
                        <router-link
                          :to="{ name: 'ProfilePage' }"
                          @click="toggleUserMenu"
                          class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <i class="material-icons text-gray-400 mr-3 text-lg">person</i>
                          <span>Mi Perfil</span>
                        </router-link>

                        <router-link
                          :to="{ name: 'HousesPages' }"
                          @click="toggleUserMenu"
                          class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <i class="material-icons text-gray-400 mr-3 text-lg">home</i>
                          <span>Mis Habitaciones</span>
                        </router-link>

                        <router-link
                          :to="{ name: 'CreateHomePage' }"
                          @click="toggleUserMenu"
                          class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <i class="material-icons text-gray-400 mr-3 text-lg">add_circle</i>
                          <span>Publicar Habitación</span>
                        </router-link>
                      </div>

                      <!-- Separador -->
                      <div class="border-t border-gray-100 my-1"></div>

                      <!-- Opciones de configuración -->
                      <div class="py-1">
                        <button
                          @click="handleSettings"
                          class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <i class="material-icons text-gray-400 mr-3 text-lg">settings</i>
                          <span>Configuración</span>
                        </button>

                        <button
                          @click="handleLogout"
                          class="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <i class="material-icons text-red-400 mr-3 text-lg">exit_to_app</i>
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  </div>
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
      <template #footer>
        <button
          v-if="showCancelButton"
          @click="handleRegisterCancel"
          :disabled="isRegistering"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          v-if="showConfirmButton"
          @click="handleRegisterSubmit"
          :disabled="isRegistering"
          class="px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isRegistering" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registrando...
          </span>
          <span v-else>Registrarse</span>
        </button>
      </template>
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
      <template #footer>
        <button
          v-if="showCancelButton"
          @click="handleLoginCancel"
          :disabled="isLoggingIn"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          v-if="showConfirmButton"
          @click="handleLoginSubmit"
          :disabled="isLoggingIn"
          class="px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoggingIn" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Iniciando sesión...
          </span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </template>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useNotifications } from '@/composables/useNotifications';
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
    const { showSuccess, showError, showInfo } = useNotifications();

    // Estados de los modales
    const registerModalOpen = ref(false);
    const loginModalOpen = ref(false);

    // Estados de carga
    const isRegistering = ref(false);
    const isLoggingIn = ref(false);

    // Estado del menú de usuario
    const userMenuOpen = ref(false);

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
      userMenuOpen.value = false;
      store.dispatch('LOG_OUT');
      showSuccess('Sesión cerrada', 'Has cerrado sesión correctamente');
    };

    // Métodos para abrir modales
    const openLoginModal = () => {
      loginModalOpen.value = true;
    };

    const openRegisterModal = () => {
      registerModalOpen.value = true;
    };

    // Handlers de eventos
    const handleRegisterSubmit = async () => {
      // Validar que las contraseñas coincidan
      if (registerForm.password !== registerForm.confirmPassword) {
        showError('Error de validación', 'Las contraseñas no coinciden');
        return;
      }

      // Validar que se acepten los términos
      if (!registerForm.terms) {
        showError('Error de validación', 'Debes aceptar los términos y condiciones');
        return;
      }

      isRegistering.value = true;

      try {
        // Crear usuario con Firebase
        await store.dispatch('CREATE_USER', {
          email: registerForm.email,
          name: registerForm.name,
          password: registerForm.password,
          phone: registerForm.phone
        });

        showSuccess('¡Registro exitoso!', 'Bienvenido a Adventures App');
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
      } catch (error) {
        console.error('Error en registro:', error);
        let errorMessage = 'Error al registrar usuario';

        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Este correo electrónico ya está registrado';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Correo electrónico inválido';
        }

        showError('Error de registro', errorMessage);
      } finally {
        isRegistering.value = false;
      }
    };

    const handleRegisterCancel = () => {
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

    const handleLoginSubmit = async () => {
      isLoggingIn.value = true;

      try {
        // Iniciar sesión con Firebase
        await store.dispatch('SIGN_IN', {
          email: loginForm.email,
          password: loginForm.password
        });

        // Obtener datos del usuario autenticado
        await store.dispatch('FETCH_AUTH_USER');

        showSuccess('¡Inicio de sesión exitoso!', 'Bienvenido de vuelta');
        loginModalOpen.value = false;

        // Resetear formulario
        Object.assign(loginForm, {
          email: '',
          password: '',
          remember: false
        });
      } catch (error) {
        console.error('Error en login:', error);
        let errorMessage = 'Error al iniciar sesión';

        if (error.code === 'auth/user-not-found') {
          errorMessage = 'Usuario no encontrado';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Contraseña incorrecta';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Correo electrónico inválido';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Demasiados intentos fallidos. Intenta más tarde';
        }

        showError('Error de inicio de sesión', errorMessage);
      } finally {
        isLoggingIn.value = false;
      }
    };

    const handleLoginCancel = () => {
      // Resetear formulario
      Object.assign(loginForm, {
        email: '',
        password: '',
        remember: false
      });
    };

    const handleSettings = () => {
      userMenuOpen.value = false;
      showInfo('Configuración', 'Funcionalidad de configuración próximamente');
    };

    const handleLogout = () => {
      logOut();
    };

    // Toggle del menú de usuario
    const toggleUserMenu = () => {
      userMenuOpen.value = !userMenuOpen.value;
    };

    // Cerrar menú al hacer clic fuera
    const closeUserMenu = () => {
      userMenuOpen.value = false;
    };

    // Agregar event listener para cerrar menú al hacer clic fuera
    const handleClickOutside = (event) => {
      const userMenuElement = document.querySelector('.user-menu');
      if (userMenuOpen.value && userMenuElement && !userMenuElement.contains(event.target)) {
        closeUserMenu();
      }
    };

    // Agregar event listener cuando el componente se monta
    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    // Limpiar event listener cuando el componente se desmonta
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      logOut,
      registerModalOpen,
      loginModalOpen,
      registerForm,
      loginForm,
      isRegistering,
      isLoggingIn,
      userMenuOpen,
      openLoginModal,
      openRegisterModal,
      handleRegisterSubmit,
      handleRegisterCancel,
      handleLoginSubmit,
      handleLoginCancel,
      handleSettings,
      handleLogout,
      toggleUserMenu,
    };
  },
};
</script>
