import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const username = ref('')
    const isLogin = () => {
      return token.value !== ''
    }
    return {
      token,
      username,
      isLogin
    }
  },
  {
    persist: true
  }
)
