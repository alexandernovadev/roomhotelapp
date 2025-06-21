<template>
  <div class="space-y-4">
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <Input
          v-model="form.name"
          type="text"
          label="Nombre completo"
          placeholder="Ingresa tu nombre completo"
          required
          autocomplete="name"
          :error="errors.name"
          icon="person"
        />

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
          placeholder="Mínimo 6 caracteres"
          required
          minlength="6"
          autocomplete="new-password"
          :error="errors.password"
          icon="lock"
        />

        <Input
          v-model="form.confirmPassword"
          type="password"
          label="Confirmar contraseña"
          placeholder="Confirma tu contraseña"
          required
          autocomplete="new-password"
          :error="errors.confirmPassword"
          icon="lock"
        />

        <Input
          v-model="form.phone"
          type="tel"
          label="Teléfono (opcional)"
          placeholder="+1 (555) 123-4567"
          autocomplete="tel"
          :error="errors.phone"
          icon="phone"
        />

        <div class="flex items-center">
          <input
            id="register-terms"
            v-model="form.terms"
            type="checkbox"
            required
            class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label for="register-terms" class="ml-2 block text-sm text-gray-700">
            Acepto los <a href="#" class="text-cyan-600 hover:text-cyan-700 underline">términos y condiciones</a>
          </label>
        </div>
      </div>
    </form>

    <!-- Botones del formulario -->
    <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
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
        {{ isSubmitting ? 'Registrando...' : 'Registrarse' }}
      </Button>
    </div>
  </div>
</template>

<script>
import { Input, Button } from '@/components/ui'
import { useForm } from '@/composables/useForm'
import { VALIDATION_RULES } from '@/utils/constants'

export default {
  name: 'RegisterForm',
  components: {
    Input,
    Button
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const { form, errors, isSubmitting, setError, validateForm } = useForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      terms: false
    })

    const validationRules = {
      name: VALIDATION_RULES.NAME,
      email: VALIDATION_RULES.EMAIL,
      password: VALIDATION_RULES.PASSWORD,
      confirmPassword: { required: true },
      terms: { required: true }
    }

    const handleSubmit = async () => {
      // Validar que las contraseñas coincidan
      if (form.password !== form.confirmPassword) {
        setError('confirmPassword', 'Las contraseñas no coinciden')
        return
      }

      // Validar que se acepten los términos
      if (!form.terms) {
        setError('terms', 'Debes aceptar los términos y condiciones')
        return
      }

      // Validar longitud mínima de contraseña
      if (form.password && form.password.length < 6) {
        setError('password', 'La contraseña debe tener al menos 6 caracteres')
        return
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (form.email && !emailRegex.test(form.email)) {
        setError('email', 'El email no tiene un formato válido')
        return
      }

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
