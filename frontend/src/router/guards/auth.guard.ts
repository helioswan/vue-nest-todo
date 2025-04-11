import { useAuthStore } from '@/stores/auth.store'
import type { RouteLocationNormalized } from 'vue-router'

export async function authGuard(to: RouteLocationNormalized) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated && to.name !== 'signin') {
    return { name: 'signin' }
  }
}
