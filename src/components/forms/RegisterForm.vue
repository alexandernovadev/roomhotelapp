<template>
  <div class="space-y-6">
    <!-- Header con gradiente -->
    <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
      <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="material-icons text-3xl">person_add</i>
      </div>
      <h2 class="text-2xl font-bold mb-2">¡Únete a nosotros!</h2>
      <p class="text-green-100 text-sm">Crea tu cuenta y comienza a explorar</p>
    </div>

    <!-- Formulario -->
    <div class="bg-gradient-to-r from-neutral-50 to-green-50 rounded-xl p-6 border border-green-100">
      <form @submit.prevent="handleSubmit" class="space-y-6">
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

          <div class="flex items-start p-4 bg-white rounded-lg border border-green-200">
            <input
              id="register-terms"
              v-model="form.terms"
              type="checkbox"
              required
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-neutral-300 rounded mt-1"
            />
            <label for="register-terms" class="ml-3 block text-sm text-neutral-700">
              Acepto los <a href="#" class="text-green-600 hover:text-green-700 underline font-medium">términos y condiciones</a>
              <span class="text-red-500">*</span>
            </label>
          </div>
        </div>
      </form>
    </div>

    <!-- Botones del formulario -->
    <div class="flex items-center justify-between pt-4 border-t border-neutral-100 bg-gradient-to-r from-neutral-50 to-green-50 rounded-xl p-4">
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
        <i class="material-icons text-sm mr-2">how_to_reg</i>
        {{ isSubmitting ? 'Registrando...' : 'Registrarse' }}
      </Button>
    </div>

    <!-- Información adicional -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
      <div class="flex items-center text-purple-800">
        <i class="material-icons text-purple-600 mr-3">security</i>
        <div>
          <p class="text-sm font-medium">Tu información está segura</p>
          <p class="text-xs text-purple-600">Utilizamos encriptación de nivel bancario para proteger tus datos</p>
        </div>
      </div>
    </div>

    <!-- Beneficios -->
    <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
      <h4 class="text-sm font-semibold text-cyan-800 mb-3 flex items-center">
        <i class="material-icons text-cyan-600 mr-2">star</i>
        Beneficios de registrarte
      </h4>
      <div class="space-y-2">
        <div class="flex items-center text-sm text-cyan-700">
          <i class="material-icons text-cyan-500 mr-2 text-xs">check_circle</i>
          Publica y gestiona tus habitaciones
        </div>
        <div class="flex items-center text-sm text-cyan-700">
          <i class="material-icons text-cyan-500 mr-2 text-xs">check_circle</i>
          Reserva espacios únicos
        </div>
        <div class="flex items-center text-sm text-cyan-700">
          <i class="material-icons text-cyan-500 mr-2 text-xs">check_circle</i>
          Recibe notificaciones personalizadas
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
