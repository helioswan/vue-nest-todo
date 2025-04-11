import { useAuthStore } from '@/stores/auth.store'
import axiosInstance from './api.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleTokenRefresh(originalConfig: any) {
  const { getRefreshToken, setToken } = useAuthStore()
  try {
    const { data } = await axiosInstance.post('/auth/refreshtoken', {
      refreshToken: getRefreshToken(),
    })

    setToken(data)

    originalConfig._retry = true
    return axiosInstance(originalConfig)
  } catch (error) {
    return Promise.reject(error)
  }
}

function setupRefreshTokenResponseInterceptor() {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config
      if (
        error.response?.status === 401 &&
        !originalConfig._retry &&
        originalConfig.url !== '/auth/signin'
      ) {
        return handleTokenRefresh(originalConfig)
      }
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
        config.headers['x-access-token'] = token
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
