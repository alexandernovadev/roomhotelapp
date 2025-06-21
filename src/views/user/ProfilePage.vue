<template>
  <page-layout>
    <!-- Header Section -->
    <PageHeader
      title="Mi Perfil"
      subtitle="Gestiona tu información personal"
      icon="person"
    />

    <!-- Profile Content -->
    <PageContainer>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
            <!-- Header con gradiente -->
            <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-6 text-white">
              <div class="text-center">
                <div class="relative inline-block">
                  <img
                    :src="profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'"
                    :alt="profile.name"
                    class="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
                  />
                  <button
                    @click="updateAvatar"
                    class="absolute bottom-0 right-0 bg-white text-cyan-600 p-2 rounded-full hover:bg-cyan-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <i class="material-icons text-sm">edit</i>
                  </button>
                </div>
                <h3 class="text-xl font-bold mt-4">{{ profile.name || 'Usuario' }}</h3>
                <p class="text-cyan-100 text-sm mt-1">{{ profile.email }}</p>
              </div>
            </div>

            <!-- Stats Section -->
            <div class="p-6">
              <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
                <div class="text-center">
                  <div class="text-3xl font-bold text-cyan-600">{{ userRoomsCount }}</div>
                  <div class="text-sm text-cyan-700 font-medium">Habitaciones</div>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="mt-6 space-y-3">
                <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div class="flex items-center">
                    <i class="material-icons text-cyan-600 mr-3">visibility</i>
                    <span class="text-sm text-neutral-700">Visualizaciones</span>
                  </div>
                  <span class="text-sm font-semibold text-neutral-900">1,234</span>
                </div>

                <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div class="flex items-center">
                    <i class="material-icons text-green-600 mr-3">favorite</i>
                    <span class="text-sm text-neutral-700">Favoritos</span>
                  </div>
                  <span class="text-sm font-semibold text-neutral-900">56</span>
                </div>

                <div class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div class="flex items-center">
                    <i class="material-icons text-purple-600 mr-3">star</i>
                    <span class="text-sm text-neutral-700">Calificación</span>
                  </div>
                  <span class="text-sm font-semibold text-neutral-900">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
            <!-- Header del formulario -->
            <div class="bg-gradient-to-r from-neutral-50 to-cyan-50 px-6 py-4 border-b border-neutral-100">
              <h2 class="text-2xl font-bold text-neutral-800">Información Personal</h2>
              <p class="text-neutral-600 text-sm mt-1">Actualiza tu información personal y preferencias</p>
            </div>

            <!-- Formulario -->
            <div class="p-6">
              <form @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    v-model="profile.name"
                    label="Nombre completo"
                    placeholder="Tu nombre completo"
                    required
                    icon="person"
                    :error="errors.name"
                  />

                  <Input
                    v-model="profile.username"
                    label="Nombre de usuario"
                    placeholder="tu_usuario"
                    required
                    icon="alternate_email"
                    :error="errors.username"
                  />
                </div>

                <Input
                  v-model="profile.email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  required
                  icon="email"
                  :error="errors.email"
                  disabled
                />

                <Input
                  v-model="profile.phone"
                  type="tel"
                  label="Teléfono"
                  placeholder="+1 (555) 123-4567"
                  icon="phone"
                  :error="errors.phone"
                />

                <Textarea
                  v-model="profile.bio"
                  label="Biografía"
                  placeholder="Cuéntanos sobre ti, tus intereses, y qué te hace único como anfitrión..."
                  rows="4"
                  icon="person_outline"
                  maxlength="500"
                  help-text="Máximo 500 caracteres"
                />

                <!-- Sección de preferencias -->
                <div class="border-t border-neutral-100 pt-6">
                  <h3 class="text-lg font-semibold text-neutral-800 mb-4">Preferencias</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-center p-3 bg-neutral-50 rounded-lg">
                      <input
                        id="email-notifications"
                        type="checkbox"
                        class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-neutral-300 rounded"
                      />
                      <label for="email-notifications" class="ml-3 text-sm text-neutral-700">
                        Notificaciones por email
                      </label>
                    </div>

                    <div class="flex items-center p-3 bg-neutral-50 rounded-lg">
                      <input
                        id="sms-notifications"
                        type="checkbox"
                        class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-neutral-300 rounded"
                      />
                      <label for="sms-notifications" class="ml-3 text-sm text-neutral-700">
                        Notificaciones por SMS
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Botones de acción -->
                <div class="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <div class="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="secondary"
                      @click="resetForm"
                      :disabled="isSubmitting"
                    >
                      <i class="material-icons text-sm mr-2">refresh</i>
                      Restablecer
                    </Button>
                  </div>

                  <div class="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="secondary"
                      @click="exportData"
                      :disabled="isSubmitting"
                    >
                      <i class="material-icons text-sm mr-2">download</i>
                      Exportar
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      :loading="isSubmitting"
                    >
                      <i class="material-icons text-sm mr-2">save</i>
                      {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Sección de actividad reciente -->
          <div class="mt-8 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
            <div class="bg-gradient-to-r from-neutral-50 to-cyan-50 px-6 py-4 border-b border-neutral-100">
              <h3 class="text-xl font-bold text-neutral-800">Actividad Reciente</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div class="flex items-center p-3 bg-neutral-50 rounded-lg">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-neutral-800">Nueva reserva recibida</p>
                    <p class="text-xs text-neutral-500">Hace 2 horas</p>
                  </div>
                </div>

                <div class="flex items-center p-3 bg-neutral-50 rounded-lg">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-neutral-800">Perfil actualizado</p>
                    <p class="text-xs text-neutral-500">Hace 1 día</p>
                  </div>
                </div>

                <div class="flex items-center p-3 bg-neutral-50 rounded-lg">
                  <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-neutral-800">Nueva reseña recibida</p>
                    <p class="text-xs text-neutral-500">Hace 3 días</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </page-layout>
</template>

<script>
import { reactive, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Input, Button, Textarea } from '@/components/ui'
import { PageHeader, PageContainer } from '@/components/layout'
import PageLayout from '@/layouts/PageLayout.vue'
import { useForm } from '@/composables/useForm'

export default {
  name: 'ProfilePage',
  components: {
    PageLayout,
    PageHeader,
    PageContainer,
    Input,
    Button,
    Textarea
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // Use form composable
    const { form: profile, errors, isSubmitting, validateForm, resetForm: resetFormComposable } = useForm({
      name: '',
      username: '',
      email: '',
      phone: '',
      bio: ''
    })

    // Validation rules
    const validationRules = {
      name: { required: true, minLength: 2 },
      username: { required: true, minLength: 3 },
      email: { required: true, email: true },
      phone: { required: false, pattern: /^[\+]?[1-9][\d]{0,15}$/, message: 'Número de teléfono inválido' },
      bio: { required: false, maxLength: 500 }
    }

    const user = computed(() => store.getters.authUser)
    const userRoomsCount = computed(() => {
      if (!user.value || !user.value.rooms) return 0
      return Object.keys(user.value.rooms).length
    })

    // Watch for user changes and update form
    watch(user, (newUser) => {
      if (newUser) {
        profile.name = newUser.name || ''
        profile.username = newUser.username || ''
        profile.email = newUser.email || ''
        profile.phone = newUser.phone || ''
        profile.bio = newUser.bio || ''
      }
    }, { immediate: true })

    const saveProfile = async () => {
      if (!validateForm(validationRules)) return

      try {
        await store.dispatch('UPDATE_USER_PROFILE', {
          name: profile.name,
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
          bio: profile.bio
        })

        // Show success message
        alert('Perfil actualizado correctamente')
      } catch (error) {
        console.error('Error updating profile:', error)
        alert('Error al actualizar el perfil. Por favor, intenta nuevamente.')
      }
    }

    const resetForm = () => {
      resetFormComposable()
      if (user.value) {
        profile.name = user.value.name || ''
        profile.username = user.value.username || ''
        profile.email = user.value.email || ''
        profile.phone = user.value.phone || ''
        profile.bio = user.value.bio || ''
      }
    }

    const updateAvatar = () => {
      // Implement avatar update functionality
      alert('Funcionalidad de actualización de avatar en desarrollo')
    }

    const exportData = () => {
      // Implement data export functionality
      alert('Funcionalidad de exportación en desarrollo')
    }

    return {
      profile,
      errors,
      isSubmitting,
      user,
      userRoomsCount,
      saveProfile,
      resetForm,
      updateAvatar,
      exportData
    }
  },
}
</script>
