<template>
  <page-layout>
    <!-- Header Section -->
    <PageHeader
      title="Mis Habitaciones"
      subtitle="Gestiona todas tus publicaciones"
    >
      <template #right>
        <div class="flex items-center space-x-4">
          <div class="text-right text-white">
            <div class="text-2xl font-bold">{{ userRooms.length }}</div>
            <div class="text-sm text-cyan-100">habitaciones</div>
          </div>
          <router-link
            :to="{ name: 'CreateHomePage' }"
            class="bg-white text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <i class="material-icons">add</i>
            <span>Nueva Habitación</span>
          </router-link>
        </div>
      </template>
    </PageHeader>

    <!-- Content Section -->
    <PageContainer>
      <!-- Empty State -->
      <div v-if="userRooms.length === 0" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <i class="material-icons text-6xl text-gray-300 mb-4">home</i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No tienes habitaciones publicadas</h3>
          <p class="text-gray-500 mb-6">Comienza compartiendo tu espacio con viajeros de todo el mundo</p>
          <router-link
            :to="{ name: 'CreateHomePage' }"
            class="inline-flex items-center px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
          >
            <i class="material-icons mr-2">add</i>
            Publicar Primera Habitación
          </router-link>
        </div>
      </div>

      <!-- Rooms Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="room in userRooms"
          :key="room['.key']"
          class="card-hover"
        >
          <!-- Room Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="room.featured_image"
              :alt="room.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-3 right-3">
              <span class="bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {{ room.type || 'Habitación' }}
              </span>
            </div>
            <div class="absolute top-3 left-3">
              <span class="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                ${{ formatPrice(room.price) }} {{ room.currency || 'COP' }}
              </span>
            </div>
          </div>

          <!-- Room Content -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2">
              {{ room.title }}
            </h3>

            <p class="text-gray-600 text-sm mb-3 line-clamp-2">
              {{ room.description }}
            </p>

            <!-- Location -->
            <div class="flex items-center text-gray-500 text-sm mb-3">
              <i class="material-icons text-sm mr-1">location_on</i>
              <span>{{ room.city || 'Ubicación no especificada' }}</span>
            </div>

            <!-- Amenities -->
            <div v-if="room.amenities" class="flex flex-wrap gap-1 mb-4">
              <span
                v-for="(value, key) in room.amenities"
                :key="key"
                v-show="value"
                class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                {{ getAmenityLabel(key) }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <div class="text-xs text-gray-500">
                Publicado {{ formatDate(room.publishedAt) }}
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="editRoom(room)"
                  class="text-cyan-600 hover:text-cyan-700 p-1"
                  title="Editar"
                >
                  <i class="material-icons text-sm">edit</i>
                </button>
                <button
                  @click="deleteRoom(room)"
                  class="text-red-600 hover:text-red-700 p-1"
                  title="Eliminar"
                >
                  <i class="material-icons text-sm">delete</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div v-if="userRooms.length > 0" class="mt-12">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-cyan-50 rounded-lg">
              <div class="text-2xl font-bold text-cyan-600">{{ userRooms.length }}</div>
              <div class="text-sm text-cyan-700">Total Habitaciones</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ activeRoomsCount }}</div>
              <div class="text-sm text-green-700">Activas</div>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ averagePrice }}</div>
              <div class="text-sm text-blue-700">Precio Promedio</div>
            </div>
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ totalViews }}</div>
              <div class="text-sm text-purple-700">Visualizaciones</div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </page-layout>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { PageHeader, PageContainer } from '@/components/layout'
import PageLayout from '@/layouts/PageLayout.vue'
import { formatPrice } from '@/utils/helpers'
import { useAmenities } from '@/composables/useAmenities'

export default {
  name: 'HousesPages',
  components: {
    PageLayout,
    PageHeader,
    PageContainer
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // Use composables
    const { getAmenityLabel } = useAmenities()

    const user = computed(() => store.getters.authUser)

    const userRooms = computed(() => {
      if (!user.value || !user.value.rooms) {
        return []
      }
      return Object.values(user.value.rooms)
        .map(roomId => store.state.rooms[roomId])
        .filter(Boolean)
        .sort((a, b) => b.publishedAt - a.publishedAt) // Mostrar más recientes primero
    })

    const activeRoomsCount = computed(() => {
      return userRooms.value.length // Por ahora todas están activas
    })

    const averagePrice = computed(() => {
      if (userRooms.value.length === 0) return 0
      const total = userRooms.value.reduce((sum, room) => sum + (room.price || 0), 0)
      return Math.round(total / userRooms.value.length)
    })

    const totalViews = computed(() => {
      return userRooms.value.reduce((sum, room) => sum + (room.meta?.views || 0), 0)
    })

    const formatDate = (timestamp) => {
      if (!timestamp) return 'Fecha desconocida'
      const date = new Date(timestamp * 1000)
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const editRoom = (room) => {
      // Implementar edición de habitación
      alert('Funcionalidad de edición en desarrollo')
    }

    const deleteRoom = (room) => {
      if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
        // Implementar eliminación de habitación
        alert('Funcionalidad de eliminación en desarrollo')
      }
    }

    return {
      userRooms,
      activeRoomsCount,
      averagePrice,
      totalViews,
      formatPrice,
      formatDate,
      getAmenityLabel,
      editRoom,
      deleteRoom
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
