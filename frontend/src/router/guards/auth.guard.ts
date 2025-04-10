import { useAuthStore } from '@/stores/auth.store'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

export async function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated && to.name !== 'signin') {
    return { name: 'signin' }
  }
}
