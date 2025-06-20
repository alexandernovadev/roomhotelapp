<template>
  <page-layout>
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-cyan-600 to-cyan-700 py-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white">Mi Perfil</h1>
            <p class="text-cyan-100 mt-2">Gestiona tu información personal y preferencias</p>
          </div>
          <div class="text-right text-white">
            <div class="text-2xl font-bold">{{ userRoomsCount }}</div>
            <div class="text-sm text-cyan-100">habitaciones publicadas</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Profile Content -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sidebar -->
          <aside class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6">
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
            <div class="bg-white rounded-lg shadow-md p-6">
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
      </div>
    </section>
  </page-layout>
</template>

<script>
import { reactive, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Input, Button } from '@/components/ui'
import PageLayout from '@/layouts/PageLayout.vue'

export default {
  name: 'ProfilePage',
  components: {
    PageLayout,
    Input,
    Button
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const isSubmitting = ref(false)
    const errors = reactive({})

    const user = computed(() => store.getters.authUser)

    const profile = reactive({
      name: '',
      username: '',
      avatar: '',
      email: '',
      phone: '',
      bio: '',
    })

    // Cargar datos del usuario cuando esté disponible
    watch(user, (newUser) => {
      if (newUser) {
        Object.assign(profile, {
          name: newUser.name || '',
          username: newUser.username || '',
          avatar: newUser.avatar || '',
          email: newUser.email || '',
          phone: newUser.phone || '',
          bio: newUser.bio || '',
        })
      }
    }, { immediate: true })

    const userRoomsCount = computed(() => {
      if (user.value) {
        return store.getters.userRoomsCount(user.value['.key'])
      }
      return 0
    })

    const validateForm = () => {
      errors.name = ''
      errors.username = ''
      errors.email = ''
      errors.phone = ''

      if (!profile.name.trim()) {
        errors.name = 'El nombre es requerido'
      }

      if (!profile.username.trim()) {
        errors.username = 'El nombre de usuario es requerido'
      } else if (profile.username.length < 3) {
        errors.username = 'El nombre de usuario debe tener al menos 3 caracteres'
      }

      if (!profile.email.trim()) {
        errors.email = 'El email es requerido'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        errors.email = 'El email no es válido'
      }

      return !Object.values(errors).some(error => error)
    }

    const saveProfile = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      try {
        // Aquí implementarías la acción para actualizar el perfil
        // await store.dispatch('UPDATE_USER_PROFILE', profile)

        // Simular guardado exitoso
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mostrar mensaje de éxito
        alert('Perfil actualizado correctamente')
      } catch (error) {
        console.error('Error al guardar perfil:', error)
        alert('Error al guardar el perfil')
      } finally {
        isSubmitting.value = false
      }
    }

    const resetForm = () => {
      if (user.value) {
        Object.assign(profile, {
          name: user.value.name || '',
          username: user.value.username || '',
          avatar: user.value.avatar || '',
          email: user.value.email || '',
          phone: user.value.phone || '',
          bio: user.value.bio || '',
        })
      }
    }

    const updateAvatar = () => {
      // Implementar funcionalidad para actualizar avatar
      const newAvatar = prompt('Ingresa la URL de tu nueva imagen de perfil:')
      if (newAvatar) {
        profile.avatar = newAvatar
      }
    }

    return {
      profile,
      userRoomsCount,
      errors,
      isSubmitting,
      saveProfile,
      resetForm,
      updateAvatar,
    }
  },
}
</script>
