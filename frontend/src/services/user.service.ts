import { useAuthStore } from '@/stores/auth.store'
import api from './api.service'

function profile() {
  const { setUser } = useAuthStore()

  return api.get('/auth/user/profile').then((response) => {
    if (response.data.accessToken) {
      setUser(response.data)
    }

    return response.data
  })
}

export default profile
