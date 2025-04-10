import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)

  function signin() {
    alert('signin')
  }

  function signup() {
    alert('singup')
  }

  function logout() {}

  function fetchUser() {}

  function refreshToken() {}
  return { isAuthenticated, user, token, fetchUser, refreshToken, logout, signin, signup }
})
