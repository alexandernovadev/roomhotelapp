<template>
  <page-layout>
    <!-- Search Header -->
    <PageHeader
      title="Encuentra tu lugar ideal"
      subtitle="Busca entre cientos de lugares increíbles"
    >
      <template #right>
        <form
          @submit.prevent="performSearch"
          class="bg-white/20 backdrop-blur-md p-4 rounded-xl w-full max-w-4xl"
        >
          <div class="flex flex-col lg:flex-row items-center gap-4">
            <Input
              v-model="searchQuery.location"
              label="Ubicación"
              placeholder="Bogotá, Colombia"
              icon="location_on"
              variant="on-dark"
              class="flex-grow"
            />
            <Input
              v-model="searchQuery.checkIn"
              type="date"
              label="Llegada"
              icon="calendar_today"
              variant="on-dark"
              class="w-full lg:w-auto"
            />
            <Input
              v-model="searchQuery.checkOut"
              type="date"
              label="Salida"
              icon="calendar_today"
              variant="on-dark"
              class="w-full lg:w-auto"
            />
            <Button
              type="submit"
              variant="primary"
              :loading="isSearching"
              class="w-full lg:w-auto flex-shrink-0 px-6 py-3"
            >
              <i class="material-icons mr-2">search</i>
              <span>{{ isSearching ? 'Buscando...' : 'Buscar' }}</span>
            </Button>
          </div>
        </form>
      </template>
    </PageHeader>

    <!-- Filters and Results -->
    <PageContainer>
      <div class="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        <!-- Filters Sidebar -->
        <aside class="lg:w-80 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-4 border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-800">Filtros</h3>
              <button
                @click="clearFilters"
                class="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                Limpiar todo
              </button>
            </div>

            <!-- Price Range -->
            <div class="mb-8">
              <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
                <i class="material-icons text-cyan-600 mr-2 text-lg">attach_money</i>
                Rango de Precio
              </h4>
              <div class="space-y-3">
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.priceRange"
                    type="radio"
                    value="0-50000"
                    class="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">$0 - $50,000</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.priceRange"
                    type="radio"
                    value="50000-100000"
                    class="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">$50,000 - $100,000</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.priceRange"
                    type="radio"
                    value="100000-200000"
                    class="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">$100,000 - $200,000</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.priceRange"
                    type="radio"
                    value="200000+"
                    class="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">$200,000+</span>
                </label>
              </div>
            </div>

            <!-- Room Type -->
            <div class="mb-8">
              <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
                <i class="material-icons text-cyan-600 mr-2 text-lg">home</i>
                Tipo de Habitación
              </h4>
              <div class="space-y-3">
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.roomTypes"
                    type="checkbox"
                    value="apartamento"
                    class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">Apartamento</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.roomTypes"
                    type="checkbox"
                    value="casa"
                    class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">Casa</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.roomTypes"
                    type="checkbox"
                    value="habitacion"
                    class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">Habitación Privada</span>
                </label>
              </div>
            </div>

            <!-- Amenities -->
            <div class="mb-8">
              <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
                <i class="material-icons text-cyan-600 mr-2 text-lg">star</i>
                Amenidades
              </h4>
              <div class="space-y-3">
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.amenities"
                    type="checkbox"
                    value="wifi"
                    class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">WiFi</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.amenities"
                    type="checkbox"
                    value="kitchen"
                    class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">Cocina</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.amenities"
                    type="checkbox"
                    value="parking"
                    class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">Estacionamiento</span>
                </label>
                <label class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    v-model="filters.amenities"
                    type="checkbox"
                    value="ac"
                    class="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span class="ml-3 text-gray-700">Aire Acondicionado</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Results -->
        <main class="flex-1 min-w-0">
          <!-- Results Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="mb-4 sm:mb-0">
              <h2 class="text-2xl font-bold text-gray-800">
                {{ filteredRooms.length }} habitaciones encontradas
              </h2>
              <p class="text-gray-600 mt-1">
                {{ searchQuery.location ? `en ${searchQuery.location}` : 'en todas las ubicaciones' }}
              </p>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-sm font-medium text-neutral-700">Ordenar por:</span>
              <select
                v-model="sortBy"
                class="border border-neutral-300 rounded-lg pl-4 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="newest">Más Recientes</option>
              </select>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredRooms.length === 0" class="text-center py-16 bg-white rounded-xl shadow-sm border border-neutral-100">
            <div class="max-w-md mx-auto">
              <i class="material-icons text-8xl text-neutral-200 mb-6">search_off</i>
              <h3 class="text-2xl font-bold text-neutral-600 mb-3">No se encontraron habitaciones</h3>
              <p class="text-neutral-500 mb-8 text-lg">Intenta ajustar tus filtros o buscar en otra ubicación</p>
              <Button @click="clearFilters" variant="primary" class="pl-8 pr-8 py-3">
                Limpiar Filtros
              </Button>
            </div>
          </div>

          <!-- Rooms Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div
              v-for="room in filteredRooms"
              :key="room['.key']"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-neutral-100"
            >
              <!-- Room Image -->
              <div class="relative h-56 overflow-hidden">
                <img
                  :src="room.featured_image"
                  :alt="room.title"
                  class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute top-4 left-4">
                  <span class="bg-white bg-opacity-95 text-cyan-600 text-xs font-bold pl-3 pr-3 py-1.5 rounded-full shadow-sm">
                    {{ room.type || 'Habitación' }}
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <button
                    @click="toggleFavorite(room)"
                    class="bg-white bg-opacity-95 p-2.5 rounded-full hover:bg-opacity-100 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <i class="material-icons text-lg" :class="isFavorite(room) ? 'text-red-500' : 'text-neutral-400'">
                      {{ isFavorite(room) ? 'favorite' : 'favorite_border' }}
                    </i>
                  </button>
                </div>
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="bg-white bg-opacity-95 rounded-lg p-3 shadow-sm">
                    <div class="text-2xl font-bold text-neutral-800">
                      ${{ formatPrice(room.price) }}
                      <span class="text-sm font-normal text-neutral-500">/ noche</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Room Content -->
              <div class="p-6">
                <h3 class="font-bold text-neutral-800 text-xl mb-3 line-clamp-2">
                  {{ room.title }}
                </h3>

                <div class="flex items-center text-neutral-500 mb-4">
                  <i class="material-icons text-cyan-600 mr-2">location_on</i>
                  <span class="text-sm">{{ room.city || 'Ubicación no especificada' }}</span>
                </div>

                <!-- Amenities -->
                <div v-if="room.amenities" class="flex flex-wrap gap-2 mb-6">
                  <span
                    v-for="(value, key) in room.amenities"
                    :key="key"
                    v-show="value"
                    class="bg-cyan-50 text-cyan-700 pl-3 pr-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    {{ getAmenityLabel(key) }}
                  </span>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div class="text-sm text-neutral-500">
                    <i class="material-icons text-sm mr-1">visibility</i>
                    {{ Math.floor(Math.random() * 100) + 50 }} vistas
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    @click="viewRoom(room)"
                    class="pl-6 pr-6 py-2"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div v-if="hasMoreRooms" class="text-center mt-12">
            <Button
              @click="loadMore"
              variant="secondary"
              :loading="isLoadingMore"
              class="pl-8 pr-8 py-3"
            >
              {{ isLoadingMore ? 'Cargando...' : 'Cargar Más' }}
            </Button>
          </div>
        </main>
      </div>
    </PageContainer>
  </page-layout>
</template>

<script>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Input, Button } from '@/components/ui'
import { PageHeader, PageContainer } from '@/components/layout'
import PageLayout from '@/layouts/PageLayout.vue'
import { formatPrice } from '@/utils/helpers'
import { useAmenities } from '@/composables/useAmenities'
import { useFavorites } from '@/composables/useFavorites'

export default {
  name: 'SearchPage',
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
    const isSearching = ref(false)
    const isLoadingMore = ref(false)
    const hasMoreRooms = ref(false)

    // Use composables
    const { getAmenityLabel } = useAmenities()
    const { isFavorite, toggleFavorite } = useFavorites()

    const searchQuery = reactive({
      location: '',
      checkIn: '',
      checkOut: ''
    })

    const filters = reactive({
      priceRange: '',
      roomTypes: [],
      amenities: []
    })

    const sortBy = ref('relevance')

    const rooms = computed(() => store.getters.rooms)

    const filteredRooms = computed(() => {
      // Convert rooms object to array
      const roomsArray = rooms.value ? Object.values(rooms.value) : []
      let filtered = [...roomsArray]

      // Filter by location
      if (searchQuery.location) {
        filtered = filtered.filter(room =>
          room.city?.toLowerCase().includes(searchQuery.location.toLowerCase())
        )
      }

      // Filter by price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number)
        filtered = filtered.filter(room => {
          const price = room.price || 0
          if (max) {
            return price >= min && price <= max
          } else {
            return price >= min
          }
        })
      }

      // Filter by room type
      if (filters.roomTypes.length > 0) {
        filtered = filtered.filter(room =>
          filters.roomTypes.includes(room.type?.toLowerCase())
        )
      }

      // Filter by amenities
      if (filters.amenities.length > 0) {
        filtered = filtered.filter(room =>
          filters.amenities.every(amenity => room.amenities?.[amenity])
        )
      }

      // Sort results
      switch (sortBy.value) {
        case 'price-low':
          filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
          break
        case 'price-high':
          filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
          break
        case 'newest':
          filtered.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0))
          break
        default:
          // Relevance sorting (default)
          break
      }

      return filtered
    })

    const performSearch = async () => {
      isSearching.value = true
      try {
        await store.dispatch('FETCH_ROOMS')
        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error('Error searching rooms:', error)
      } finally {
        isSearching.value = false
      }
    }

    const clearFilters = () => {
      Object.assign(searchQuery, {
        location: '',
        checkIn: '',
        checkOut: ''
      })
      Object.assign(filters, {
        priceRange: '',
        roomTypes: [],
        amenities: []
      })
      sortBy.value = 'relevance'
    }

    const loadMore = async () => {
      isLoadingMore.value = true
      try {
        // Implement pagination logic here
        await new Promise(resolve => setTimeout(resolve, 1000))
        hasMoreRooms.value = false
      } finally {
        isLoadingMore.value = false
      }
    }

    const viewRoom = (room) => {
      // Implement room detail view
      alert('Funcionalidad de detalles en desarrollo')
    }

    onMounted(() => {
      store.dispatch('FETCH_ROOMS')
    })

    return {
      rooms,
      filteredRooms,
      searchQuery,
      filters,
      sortBy,
      isSearching,
      isLoadingMore,
      hasMoreRooms,
      performSearch,
      clearFilters,
      loadMore,
      toggleFavorite,
      isFavorite,
      viewRoom,
      formatPrice,
      getAmenityLabel
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
