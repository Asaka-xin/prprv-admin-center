import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        id: '',
        name: '',
        phone: '',
        email: '',
        status: [],
        role: '',
        authority: [],
        avatar: '',
        access: '',
        refresh: ''
      },
      manage: {
        current: {},
        list: [],
        total: 0,
        page: 1,
        size: 10
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
        paths: ['user']
      },
      {
        key: 'manage',
        storage: localStorage,
        paths: ['manage']
      },
      {
        key: 'manage.current',
        storage: sessionStorage,
        paths: ['manage.current']
      }
    ]
  }
})
