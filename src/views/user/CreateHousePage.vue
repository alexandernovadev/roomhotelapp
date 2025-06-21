<template>
  <page-layout>
    <!-- Header Section -->
    <PageHeader
      title="Publicar Nueva Habitación"
      subtitle="Comparte tu espacio con viajeros de todo el mundo"
      icon="add_home"
    />

    <!-- Form Section -->
    <PageContainer>
      <div class="max-w-4xl mx-auto">
        <div class="card p-8">
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
                    class="input-field"
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
                  class="input-field"
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
    </PageContainer>
  </page-layout>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Input, Button } from '@/components/ui'
import { PageHeader, PageContainer } from '@/components/layout'
import PageLayout from '@/layouts/PageLayout.vue'
import { useAmenities } from '@/composables/useAmenities'
import { useForm } from '@/composables/useForm'

export default {
  name: 'CreateHousePage',
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

    // Use composables
    const { defaultAmenities } = useAmenities()

    // Use form composable
    const { form: publication, errors, isSubmitting, validateForm, resetForm: resetFormComposable } = useForm({
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
      amenities: { ...defaultAmenities }
    })

    // Validation rules
    const validationRules = {
      title: { required: true, minLength: 3 },
      type: { required: true },
      city: { required: true },
      address: { required: true },
      price: { required: true },
      description: { required: true, minLength: 10 },
      featuredImage: { required: true }
    }

    const save = async () => {
      if (!validateForm(validationRules)) return

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
        alert('Error al crear la habitación. Por favor, intenta nuevamente.')
      }
    }

    const resetForm = () => {
      resetFormComposable()
      publication.amenities = { ...defaultAmenities }
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
