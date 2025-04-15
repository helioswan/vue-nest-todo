import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store'
import axiosInstance from './api.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleTokenRefresh(originalConfig: any) {
  const { getRefreshToken, setToken } = useAuthStore()
  try {
    const res = await axiosInstance.post('/auth/refreshtoken', {
      refreshToken: getRefreshToken(),
    })
    const token = res.data.data
    setToken(token)

    return axiosInstance(originalConfig)
  } catch (error) {
    return Promise.reject(error)
  }
}

function setupRefreshTokenResponseInterceptor() {
  const router = useRouter()
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config
      if (
        error.response?.status === 401 &&
        originalConfig.url !== '/auth/login' &&
        originalConfig.url !== '/auth/refreshtoken'
      ) {
        return handleTokenRefresh(originalConfig)
      }
      router.push({ name: 'signin' })
      return Promise.reject(error)
    },
  )
}

function setupAuthRequestInterceptor() {
  const { getAccessToken } = useAuthStore()

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAccessToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}

function setupInterceptors() {
  setupAuthRequestInterceptor()
  setupRefreshTokenResponseInterceptor()
}

export default setupInterceptors
