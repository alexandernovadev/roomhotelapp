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
        <div class="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
          <!-- Formulario -->
          <div class="p-8">
            <form @submit.prevent="save" class="space-y-8">
              <!-- Basic Information -->
              <div
                class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100"
              >
                <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                  <i class="material-icons text-cyan-600 mr-3">home</i>
                  Información Básica
                </h2>
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
              <div
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
              >
                <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                  <i class="material-icons text-green-600 mr-3">location_on</i>
                  Ubicación
                </h2>
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
              <div
                class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100"
              >
                <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                  <i class="material-icons text-yellow-600 mr-3">attach_money</i>
                  Precios
                </h2>
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
              <div
                class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
              >
                <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                  <i class="material-icons text-purple-600 mr-3">star</i>
                  Amenidades
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.wifi"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">WiFi</span>
                  </label>

                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.kitchen"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">Cocina</span>
                  </label>

                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.parking"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">Estacionamiento</span>
                  </label>

                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.ac"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">Aire acondicionado</span>
                  </label>

                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.tv"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">TV</span>
                  </label>

                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.washer"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">Lavadora</span>
                  </label>

                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.pool"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">Piscina</span>
                  </label>

                  <label
                    class="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <input
                      v-model="publication.amenities.gym"
                      type="checkbox"
                      class="rounded border-neutral-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span class="text-sm text-neutral-700 ml-2">Gimnasio</span>
                  </label>
                </div>
              </div>

              <!-- Images -->
              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
              >
                <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                  <i class="material-icons text-blue-600 mr-3">photo_library</i>
                  Imágenes
                </h2>
                <div class="space-y-4">
                  <Input
                    v-model="publication.featuredImage"
                    label="Imagen principal"
                    placeholder="https://images.unsplash.com/photo-1432303492674-642e9d0944b"
                    required
                    icon="photo"
                    :error="errors.featuredImage"
                  />

                  <Textarea
                    v-model="publication.additionalImages"
                    label="Imágenes adicionales (una por línea)"
                    placeholder="https://images.unsplash.com/photo-1&#10;https://images.unsplash.com/photo-2&#10;https://images.unsplash.com/photo-3"
                    rows="4"
                    icon="collections"
                    :error="errors.additionalImages"
                  />
                </div>
              </div>

              <!-- Description -->
              <div
                class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100"
              >
                <h2 class="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                  <i class="material-icons text-teal-600 mr-3">description</i>
                  Descripción
                </h2>
                <Textarea
                  v-model="publication.description"
                  label="Describe las características y amenidades de tu habitación"
                  placeholder="Describe tu espacio, las comodidades disponibles, las reglas de la casa, y cualquier información importante para los huéspedes..."
                  rows="6"
                  required
                  icon="description"
                  :error="errors.description"
                  maxlength="1000"
                  help-text="Mínimo 10 caracteres"
                />
              </div>

              <!-- Submit Buttons -->
              <div
                class="flex items-center justify-between pt-8 border-t border-neutral-100 bg-gradient-to-r from-neutral-50 to-cyan-50 rounded-xl p-6"
              >
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
                    @click="previewForm"
                    :disabled="isSubmitting"
                  >
                    <i class="material-icons text-sm mr-2">visibility</i>
                    Vista Previa
                  </Button>
                  <Button type="submit" variant="primary" :loading="isSubmitting">
                    <i class="material-icons text-sm mr-2">publish</i>
                    {{ isSubmitting ? 'Publicando...' : 'Publicar Habitación' }}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Progress indicator -->
        <div class="mt-8 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
          <div
            class="bg-gradient-to-r from-neutral-50 to-cyan-50 px-6 py-4 border-b border-neutral-100"
          >
            <h3 class="text-lg font-bold text-neutral-800">Progreso del Formulario</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Información básica</span>
                <i class="material-icons text-green-500">check_circle</i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Ubicación</span>
                <i class="material-icons text-green-500">check_circle</i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Precios</span>
                <i class="material-icons text-green-500">check_circle</i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Amenidades</span>
                <i class="material-icons text-green-500">check_circle</i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Imágenes</span>
                <i class="material-icons text-green-500">check_circle</i>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Descripción</span>
                <i class="material-icons text-green-500">check_circle</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </page-layout>
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Input, Button, Textarea } from '@/components/ui'
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
    Button,
    Textarea,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // Use composables
    const { defaultAmenities } = useAmenities()

    // Use form composable
    const {
      form: publication,
      errors,
      isSubmitting,
      validateForm,
      resetForm: resetFormComposable,
    } = useForm({
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
      amenities: { ...defaultAmenities },
    })

    // Validation rules
    const validationRules = {
      title: { required: true, minLength: 3 },
      type: { required: true },
      city: { required: true },
      address: { required: true },
      price: { required: true },
      description: { required: true, minLength: 10 },
      featuredImage: { required: true },
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
          additional_images: publication.additionalImages.split('\n').filter((img) => img.trim()),
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

    const previewForm = () => {
      // Implement preview functionality
      alert('Funcionalidad de vista previa en desarrollo')
    }

    return {
      publication,
      errors,
      isSubmitting,
      save,
      resetForm,
      previewForm,
    }
  },
}
</script>
