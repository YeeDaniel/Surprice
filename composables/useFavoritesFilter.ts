// composables/useFavoritesFilter.ts
import { ref } from 'vue'

const showFavoritesOnly = ref(false)

export function useFavoritesFilter() {
  return {
    showFavoritesOnly,
    toggleFavoritesOnly: () => {
      showFavoritesOnly.value = !showFavoritesOnly.value
    },
    resetFavoritesOnly: () => {
      showFavoritesOnly.value = false
    }
  }
}
