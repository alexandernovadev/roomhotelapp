import { computed } from 'vue'
import { useStore } from 'vuex'
import { useNotifications } from './useNotifications'

export function useAuth() {
  const store = useStore()
  const { showSuccess, showError } = useNotifications()

  const user = computed(() => store.getters.authUser)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials) => {
    try {
      await store.dispatch('SIGN_IN', credentials)
      await store.dispatch('FETCH_AUTH_USER')
      showSuccess('¡Inicio de sesión exitoso!', 'Bienvenido de vuelta')
      return true
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code)
      showError('Error de inicio de sesión', errorMessage)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      await store.dispatch('CREATE_USER', userData)
      showSuccess('¡Registro exitoso!', 'Bienvenido a Adventures App')
      return true
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code)
      showError('Error de registro', errorMessage)
      throw error
    }
  }

  const logout = () => {
    store.dispatch('LOG_OUT')
    showSuccess('Sesión cerrada', 'Has cerrado sesión correctamente')
  }

  const getAuthErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/email-already-in-use': 'Este correo electrónico ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada'
    }

    return errorMessages[errorCode] || 'Error de autenticación'
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    getAuthErrorMessage
  }
}
