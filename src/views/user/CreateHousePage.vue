<template>
  <page-layout>
    <!-- Header Section -->
    <section class="bg-gradient-to-r from-cyan-600 to-cyan-700 py-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white">Publicar Nueva Habitación</h1>
            <p class="text-cyan-100 mt-2">Comparte tu espacio con viajeros de todo el mundo</p>
          </div>
          <div class="text-right text-white">
            <i class="material-icons text-4xl">add_home</i>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-lg shadow-md p-8">
            <form @submit.prevent="save" class="space-y-8">
              <!-- Basic Information -->
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Información Básica</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    v-model="publication.title"
                    label="Título de la publicación"
                    placeholder="Hermoso apartamento en el centro de la ciudad"
                    required
                    icon="home"
                    :error="errors.title"
                  />

                  <Input
                    v-model="publication.type"
                    label="Tipo de habitación"
                    placeholder="Apartamento, Casa, Habitación privada"
                    required
                    icon="category"
                    :error="errors.type"
                  />
                </div>
              </div>

              <!-- Location -->
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Ubicación</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    v-model="publication.city"
                    label="Ciudad"
                    placeholder="Bogotá, Colombia"
                    required
                    icon="location_city"
                    :error="errors.city"
                  />

                  <Input
                    v-model="publication.address"
                    label="Dirección"
                    placeholder="Calle 123 # 45-67"
                    required
                    icon="location_on"
                    :error="errors.address"
                  />
                </div>
              </div>

              <!-- Pricing -->
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Precios</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    v-model="publication.price"
                    type="number"
                    label="Precio por noche"
                    placeholder="150000"
                    required
                    icon="attach_money"
                    :error="errors.price"
                  />

                  <Input
                    v-model="publication.currency"
                    label="Moneda"
                    placeholder="COP"
                    required
                    icon="monetization_on"
                    :error="errors.currency"
                  />

                  <Input
                    v-model="publication.discount"
                    type="number"
                    label="Descuento semanal (%)"
                    placeholder="10"
                    icon="local_offer"
                    :error="errors.discount"
                  />
                </div>
              </div>

              <!-- Amenities -->
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Amenidades</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.wifi"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">WiFi</span>
                  </label>

                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.kitchen"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">Cocina</span>
                  </label>

                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.parking"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">Estacionamiento</span>
                  </label>

                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.ac"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">Aire acondicionado</span>
                  </label>

                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.tv"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">TV</span>
                  </label>

                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.washer"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">Lavadora</span>
                  </label>

                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.pool"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">Piscina</span>
                  </label>

                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="publication.amenities.gym"
                      type="checkbox"
                      class="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-gray-700">Gimnasio</span>
                  </label>
                </div>
              </div>

              <!-- Images -->
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Imágenes</h2>
                <div class="space-y-4">
                  <Input
                    v-model="publication.featuredImage"
                    label="Imagen principal"
                    placeholder="https://images.unsplash.com/photo-1432303492674-642e9d0944b"
                    required
                    icon="photo"
                    :error="errors.featuredImage"
                  />

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Imágenes adicionales (una por línea)
                    </label>
                    <textarea
                      v-model="publication.additionalImages"
                      rows="4"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="https://images.unsplash.com/photo-1&#10;https://images.unsplash.com/photo-2&#10;https://images.unsplash.com/photo-3"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">Descripción</h2>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Describe las características y amenidades de tu habitación
                  </label>
                  <textarea
                    v-model="publication.description"
                    rows="6"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Describe tu espacio, las comodidades disponibles, las reglas de la casa, y cualquier información importante para los huéspedes..."
                    required
                  ></textarea>
                  <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
                </div>
              </div>

              <!-- Submit Buttons -->
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
                  {{ isSubmitting ? 'Publicando...' : 'Publicar Habitación' }}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </page-layout>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Input, Button } from '@/components/ui'
import PageLayout from '@/layouts/PageLayout.vue'

export default {
  name: 'CreateHousePage',
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

    const publication = reactive({
      title: '',
      type: '',
      city: '',
      address: '',
      price: '',
      currency: 'COP',
      discount: '',
      description: '',
      featuredImage: '',
      additionalImages: '',
      amenities: {
        wifi: false,
        kitchen: false,
        parking: false,
        ac: false,
        tv: false,
        washer: false,
        pool: false,
        gym: false
      }
    })

    const validateForm = () => {
      errors.title = ''
      errors.type = ''
      errors.city = ''
      errors.address = ''
      errors.price = ''
      errors.description = ''
      errors.featuredImage = ''

      if (!publication.title.trim()) {
        errors.title = 'El título es requerido'
      }

      if (!publication.type.trim()) {
        errors.type = 'El tipo de habitación es requerido'
      }

      if (!publication.city.trim()) {
        errors.city = 'La ciudad es requerida'
      }

      if (!publication.address.trim()) {
        errors.address = 'La dirección es requerida'
      }

      if (!publication.price || publication.price <= 0) {
        errors.price = 'El precio debe ser mayor a 0'
      }

      if (!publication.description.trim()) {
        errors.description = 'La descripción es requerida'
      }

      if (!publication.featuredImage.trim()) {
        errors.featuredImage = 'La imagen principal es requerida'
      }

      return !Object.values(errors).some(error => error)
    }

    const save = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      try {
        const room = {
          title: publication.title,
          type: publication.type,
          city: publication.city,
          address: publication.address,
          price: parseInt(publication.price),
          currency: publication.currency,
          discount: publication.discount ? parseInt(publication.discount) : 0,
          description: publication.description,
          featured_image: publication.featuredImage,
          additional_images: publication.additionalImages.split('\n').filter(img => img.trim()),
          amenities: publication.amenities,
          // 'publishedAt' is handled by the store action
        }

        await store.dispatch('CREATE_ROOM', room)
        router.push({ name: 'HousesPages' })
      } catch (error) {
        console.error('Error creating room:', error)
        alert('Error al crear la habitación')
      } finally {
        isSubmitting.value = false
      }
    }

    const resetForm = () => {
      Object.assign(publication, {
        title: '',
        type: '',
        city: '',
        address: '',
        price: '',
        currency: 'COP',
        discount: '',
        description: '',
        featuredImage: '',
        additionalImages: '',
        amenities: {
          wifi: false,
          kitchen: false,
          parking: false,
          ac: false,
          tv: false,
          washer: false,
          pool: false,
          gym: false
        }
      })
    }

    return {
      publication,
      errors,
      isSubmitting,
      save,
      resetForm
    }
  }
}
</script>
