<template>
  <div class="space-y-4">
    <form @submit.prevent="handleSubmit">
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
          <a href="#" class="text-sm text-cyan-600 hover:text-cyan-700">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </form>

    <!-- Botones del formulario -->
    <div class="flex items-center justify-end space-x-3 pt-4 border-t border-neutral-100">
      <Button
        variant="secondary"
        @click="$emit('cancel')"
        :disabled="isSubmitting"
      >
        Cancelar
      </Button>
      <Button
        variant="primary"
        @click="handleSubmit"
        :loading="isSubmitting"
      >
        {{ isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
      </Button>
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
