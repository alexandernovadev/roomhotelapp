import { reactive } from 'vue'

export function useAmenities() {
  // Amenity labels mapping
  const amenityLabels = {
    wifi: 'WiFi',
    kitchen: 'Cocina',
    parking: 'Estacionamiento',
    ac: 'A/C',
    tv: 'TV',
    washer: 'Lavadora',
    pool: 'Piscina',
    gym: 'Gimnasio'
  }

  // Default amenities structure
  const defaultAmenities = reactive({
    wifi: false,
    kitchen: false,
    parking: false,
    ac: false,
    tv: false,
    washer: false,
    pool: false,
    gym: false
  })

  // Get amenity label by key
  const getAmenityLabel = (key) => {
    return amenityLabels[key] || key
  }

  // Get all amenity labels
  const getAllAmenityLabels = () => {
    return amenityLabels
  }

  // Create amenities object from array of selected amenities
  const createAmenitiesFromArray = (selectedAmenities = []) => {
    const amenities = { ...defaultAmenities }
    selectedAmenities.forEach(amenity => {
      if (amenities.hasOwnProperty(amenity)) {
        amenities[amenity] = true
      }
    })
    return amenities
  }

  // Get selected amenities as array
  const getSelectedAmenities = (amenities) => {
    return Object.entries(amenities || {})
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key)
  }

  // Reset amenities to default
  const resetAmenities = () => {
    Object.keys(defaultAmenities).forEach(key => {
      defaultAmenities[key] = false
    })
  }

  return {
    amenityLabels,
    defaultAmenities,
    getAmenityLabel,
    getAllAmenityLabels,
    createAmenitiesFromArray,
    getSelectedAmenities,
    resetAmenities
  }
}
