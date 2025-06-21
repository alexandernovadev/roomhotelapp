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
          <div class="card p-6">
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="profile.avatar"
                  :alt="profile.name"
                  class="w-24 h-24 rounded-full object-cover border-4 border-cyan-100"
                />
                <button
                  @click="updateAvatar"
                  class="absolute bottom-0 right-0 bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition-colors duration-200"
                >
                  <i class="material-icons text-sm">edit</i>
                </button>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mt-4">{{ profile.name || 'Usuario' }}</h3>
              <p class="text-gray-500 text-sm">{{ profile.email }}</p>
              <div class="mt-4 p-3 bg-cyan-50 rounded-lg">
                <div class="text-2xl font-bold text-cyan-600">{{ userRoomsCount }}</div>
                <div class="text-sm text-cyan-700">Habitaciones</div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="card p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6">Información Personal</h2>

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

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Biografía
                </label>
                <textarea
                  v-model="profile.bio"
                  rows="4"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Cuéntanos sobre ti..."
                ></textarea>
              </div>

              <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                <Button
                  type="button"
                  variant="secondary"
                  @click="resetForm"
                  :disabled="isSubmitting"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  :loading="isSubmitting"
                >
                  {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
                </Button>
              </div>
            </form>
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
import { Input, Button } from '@/components/ui'
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
    Button
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // Use form composable
    const { form: profile, errors, isSubmitting, validateForm, resetForm: resetFormComposable } = useForm({
      name: '',
      username: '',
      email: '',
      phone: ''
    })

    // Validation rules
    const validationRules = {
      name: { required: true, minLength: 2 },
      username: { required: true, minLength: 3 },
      email: { required: true, email: true },
      phone: { required: false, pattern: /^[\+]?[1-9][\d]{0,15}$/, message: 'Número de teléfono inválido' }
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
      }
    }, { immediate: true })

    const saveProfile = async () => {
      if (!validateForm(validationRules)) return

      try {
        await store.dispatch('UPDATE_USER_PROFILE', {
          name: profile.name,
          username: profile.username,
          email: profile.email,
          phone: profile.phone
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
      }
    }

    const updateAvatar = () => {
      // Implement avatar update functionality
      alert('Funcionalidad de actualización de avatar en desarrollo')
    }

    return {
      profile,
      errors,
      isSubmitting,
      user,
      userRoomsCount,
      saveProfile,
      resetForm,
      updateAvatar
    }
  },
}
</script>
