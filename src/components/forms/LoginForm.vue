<template>
  <div class="space-y-6">
    <!-- Header con gradiente -->
    <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white text-center">
      <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="material-icons text-3xl">lock</i>
      </div>
      <h2 class="text-2xl font-bold mb-2">¡Bienvenido de vuelta!</h2>
      <p class="text-cyan-100 text-sm">Ingresa tus credenciales para continuar</p>
    </div>

    <!-- Formulario -->
    <div class="bg-gradient-to-r from-neutral-50 to-cyan-50 rounded-xl p-6 border border-cyan-100">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <Input
            v-model="form.email"
            type="email"
            label="Correo electrónico"
            placeholder="tu@email.com"
            required
            autocomplete="email"
            :error="errors.email"
            icon="email"
          />

          <Input
            v-model="form.password"
            type="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            required
            autocomplete="current-password"
            :error="errors.password"
            icon="lock"
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="login-remember"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-neutral-300 rounded"
              />
              <label for="login-remember" class="ml-2 block text-sm text-neutral-700">
                Recordarme
              </label>
            </div>
            <a href="#" class="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </form>
    </div>

    <!-- Botones del formulario -->
    <div class="flex items-center justify-between pt-4 border-t border-neutral-100 bg-gradient-to-r from-neutral-50 to-cyan-50 rounded-xl p-4">
      <Button
        variant="secondary"
        @click="$emit('cancel')"
        :disabled="isSubmitting"
      >
        <i class="material-icons text-sm mr-2">close</i>
        Cancelar
      </Button>
      <Button
        variant="primary"
        @click="handleSubmit"
        :loading="isSubmitting"
      >
        <i class="material-icons text-sm mr-2">login</i>
        {{ isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
      </Button>
    </div>

    <!-- Información adicional -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
      <div class="flex items-center text-blue-800">
        <i class="material-icons text-blue-600 mr-3">info</i>
        <div>
          <p class="text-sm font-medium">¿No tienes cuenta?</p>
          <p class="text-xs text-blue-600">Regístrate para acceder a todas las funcionalidades</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Button } from '@/components/ui'
import { useForm } from '@/composables/useForm'
import { VALIDATION_RULES } from '@/utils/constants'

export default {
  name: 'LoginForm',
  components: {
    Input,
    Button
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const { form, errors, isSubmitting, validateForm } = useForm({
      email: '',
      password: '',
      remember: false
    })

    const validationRules = {
      email: VALIDATION_RULES.EMAIL,
      password: VALIDATION_RULES.PASSWORD
    }

    const handleSubmit = async () => {
      if (validateForm(validationRules)) {
        emit('submit', { ...form })
      }
    }

    return {
      form,
      errors,
      isSubmitting,
      handleSubmit
    }
  }
}
</script>
