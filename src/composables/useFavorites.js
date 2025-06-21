import { ref, computed } from 'vue'
import { getLocalStorage, setLocalStorage } from '@/utils/helpers'

export function useFavorites() {
  // Favorites stored in localStorage
  const favorites = ref(getLocalStorage('favorites', []))

  // Computed property to check if a room is favorite
  const isFavorite = (room) => {
    if (!room || !room['.key']) return false
    return favorites.value.includes(room['.key'])
  }

  // Toggle favorite status
  const toggleFavorite = (room) => {
    if (!room || !room['.key']) return

    const roomKey = room['.key']
    const index = favorites.value.indexOf(roomKey)

    if (index > -1) {
      // Remove from favorites
      favorites.value.splice(index, 1)
    } else {
      // Add to favorites
      favorites.value.push(roomKey)
    }

    // Save to localStorage
    setLocalStorage('favorites', favorites.value)
  }

  // Add room to favorites
  const addToFavorites = (room) => {
    if (!room || !room['.key']) return

    const roomKey = room['.key']
    if (!favorites.value.includes(roomKey)) {
      favorites.value.push(roomKey)
      setLocalStorage('favorites', favorites.value)
    }
  }

  // Remove room from favorites
  const removeFromFavorites = (room) => {
    if (!room || !room['.key']) return

    const roomKey = room['.key']
    const index = favorites.value.indexOf(roomKey)

    if (index > -1) {
      favorites.value.splice(index, 1)
      setLocalStorage('favorites', favorites.value)
    }
  }

  // Get all favorite room keys
  const getFavoriteKeys = () => {
    return [...favorites.value]
  }

  // Get favorite rooms from a list of rooms
  const getFavoriteRooms = (rooms) => {
    if (!rooms || !Array.isArray(rooms)) return []
    return rooms.filter(room => isFavorite(room))
  }

  // Clear all favorites
  const clearFavorites = () => {
    favorites.value = []
    setLocalStorage('favorites', [])
  }

  // Get favorites count
  const favoritesCount = computed(() => favorites.value.length)

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    getFavoriteKeys,
    getFavoriteRooms,
    clearFavorites,
    favoritesCount
  }
}
