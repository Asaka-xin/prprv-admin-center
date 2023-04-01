import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      current: {
        route: '',
        dark: false,
        collapsed: false
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})
