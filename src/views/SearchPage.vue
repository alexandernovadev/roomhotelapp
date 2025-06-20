<template>
  <page-layout>
    <!-- Search Header -->
    <section class="bg-gradient-to-r from-cyan-600 to-cyan-700 py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold text-white text-center mb-6">Encuentra tu lugar ideal</h1>
          <form @submit.prevent="performSearch" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                v-model="searchQuery.location"
                label="Ubicación"
                placeholder="Bogotá, Colombia"
                icon="location_on"
              />
              <Input
                v-model="searchQuery.checkIn"
                type="date"
                label="Llegada"
                icon="calendar_today"
              />
              <Input
                v-model="searchQuery.checkOut"
                type="date"
                label="Salida"
                icon="calendar_today"
              />
            </div>
            <div class="flex justify-center">
              <Button
                type="submit"
                variant="primary"
                :loading="isSearching"
                class="px-8"
              >
                <i class="material-icons mr-2">search</i>
                {{ isSearching ? 'Buscando...' : 'Buscar Habitaciones' }}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Filters and Results -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar -->
          <aside class="lg:w-1/4">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>

              <!-- Price Range -->
              <div class="mb-6">
                <h4 class="font-medium text-gray-700 mb-3">Rango de Precio</h4>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.priceRange"
                      type="radio"
                      value="0-50000"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">$0 - $50,000</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.priceRange"
                      type="radio"
                      value="50000-100000"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">$50,000 - $100,000</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.priceRange"
                      type="radio"
                      value="100000-200000"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">$100,000 - $200,000</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.priceRange"
                      type="radio"
                      value="200000+"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">$200,000+</span>
                  </label>
                </div>
              </div>

              <!-- Room Type -->
              <div class="mb-6">
                <h4 class="font-medium text-gray-700 mb-3">Tipo de Habitación</h4>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.roomTypes"
                      type="checkbox"
                      value="apartamento"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">Apartamento</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.roomTypes"
                      type="checkbox"
                      value="casa"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">Casa</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.roomTypes"
                      type="checkbox"
                      value="habitacion"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">Habitación Privada</span>
                  </label>
                </div>
              </div>

              <!-- Amenities -->
              <div class="mb-6">
                <h4 class="font-medium text-gray-700 mb-3">Amenidades</h4>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.amenities"
                      type="checkbox"
                      value="wifi"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">WiFi</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.amenities"
                      type="checkbox"
                      value="kitchen"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">Cocina</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.amenities"
                      type="checkbox"
                      value="parking"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">Estacionamiento</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="filters.amenities"
                      type="checkbox"
                      value="ac"
                      class="text-cyan-600"
                    />
                    <span class="text-sm">Aire Acondicionado</span>
                  </label>
                </div>
              </div>

              <!-- Clear Filters -->
              <Button
                @click="clearFilters"
                variant="secondary"
                class="w-full"
              >
                Limpiar Filtros
              </Button>
            </div>
          </aside>

          <!-- Results -->
          <main class="lg:w-3/4">
            <!-- Results Header -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-2xl font-semibold text-gray-800">
                  {{ filteredRooms.length }} habitaciones encontradas
                </h2>
                <p class="text-gray-600 text-sm">
                  {{ searchQuery.location ? `en ${searchQuery.location}` : 'en todas las ubicaciones' }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">Ordenar por:</span>
                <select
                  v-model="sortBy"
                  class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="newest">Más Recientes</option>
                </select>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredRooms.length === 0" class="text-center py-12">
              <i class="material-icons text-6xl text-gray-300 mb-4">search_off</i>
              <h3 class="text-xl font-semibold text-gray-600 mb-2">No se encontraron habitaciones</h3>
              <p class="text-gray-500 mb-6">Intenta ajustar tus filtros o buscar en otra ubicación</p>
              <Button @click="clearFilters" variant="primary">
                Limpiar Filtros
              </Button>
            </div>

            <!-- Rooms Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div
                v-for="room in filteredRooms"
                :key="room['.key']"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <!-- Room Image -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    :src="room.featured_image"
                    :alt="room.title"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute top-3 left-3">
                    <span class="bg-white bg-opacity-90 text-cyan-600 text-xs font-semibold px-2 py-1 rounded-full">
                      {{ room.type || 'Habitación' }}
                    </span>
                  </div>
                  <div class="absolute top-3 right-3">
                    <button
                      @click="toggleFavorite(room)"
                      class="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200"
                    >
                      <i class="material-icons text-sm" :class="isFavorite(room) ? 'text-red-500' : 'text-gray-400'">
                        {{ isFavorite(room) ? 'favorite' : 'favorite_border' }}
                      </i>
                    </button>
                  </div>
                </div>

                <!-- Room Content -->
                <div class="p-4">
                  <h3 class="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                    {{ room.title }}
                  </h3>

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

                  <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-600">
                      <span class="font-bold text-lg text-gray-900">
                        ${{ formatPrice(room.price) }}
                      </span>
                      <span class="text-gray-500"> / noche</span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      @click="viewRoom(room)"
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Load More -->
            <div v-if="hasMoreRooms" class="text-center mt-8">
              <Button
                @click="loadMore"
                variant="secondary"
                :loading="isLoadingMore"
              >
                {{ isLoadingMore ? 'Cargando...' : 'Cargar Más' }}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </section>
  </page-layout>
</template>

<script>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Input, Button } from '@/components/ui'
import PageLayout from '@/layouts/PageLayout.vue'

export default {
  name: 'SearchPage',
  components: {
    PageLayout,
    Input,
    Button
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const isSearching = ref(false)
    const isLoadingMore = ref(false)
    const hasMoreRooms = ref(false)

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
    const favorites = ref([])

    const rooms = computed(() => store.getters.rooms)

    const filteredRooms = computed(() => {
      let filtered = [...rooms.value]

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

    const toggleFavorite = (room) => {
      const index = favorites.value.indexOf(room['.key'])
      if (index > -1) {
        favorites.value.splice(index, 1)
      } else {
        favorites.value.push(room['.key'])
      }
    }

    const isFavorite = (room) => {
      return favorites.value.includes(room['.key'])
    }

    const viewRoom = (room) => {
      // Implement room detail view
      alert('Funcionalidad de detalles en desarrollo')
    }

    const formatPrice = (price) => {
      if (!price) return '0'
      return new Intl.NumberFormat('es-CO').format(price)
    }

    const getAmenityLabel = (key) => {
      const labels = {
        wifi: 'WiFi',
        kitchen: 'Cocina',
        parking: 'Estacionamiento',
        ac: 'A/C',
        tv: 'TV',
        washer: 'Lavadora',
        pool: 'Piscina',
        gym: 'Gimnasio'
      }
      return labels[key] || key
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
