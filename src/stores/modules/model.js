import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModelStore = defineStore(
  'model',
  () => {
    const image_detection_id = ref('')

    return {
      image_detection_id
    }
  },
  {
    persist: true
  }
)
