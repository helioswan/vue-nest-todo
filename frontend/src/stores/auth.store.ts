import type { SigninDto } from '@/dto/signin.dto'
import type { SignupDto } from '@/dto/signup.dto'
import type { User } from '@/interfaces/auth/user.entity'
import type { Token } from '@/interfaces/auth/token.entity'
import AuthService from '@/services/auth.service'
import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { reactive, ref, type Reactive, type Ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user: Ref<User | undefined> = ref(undefined)
    const token: Reactive<Token> = reactive({ accessToken: '', refreshToken: '' })
    const isAuthenticated = ref(false)
    const toast = useToast()
    const router = useRouter()

    async function signin(signinDto: SigninDto) {
      try {
        const res = await AuthService.login(signinDto)
        toast.add({
          title: 'Login successful',
          description: 'You are now logged in.',
          color: 'success',
        })
        const token = res.data.data
        setToken({ accessToken: token.accessToken, refreshToken: token.refreshToken })
        isAuthenticated.value = true
        router.push({ name: 'home' })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          const desc =
            err.response.data.statusCode === 401
              ? 'Invalid credentials'
              : 'An error occurred while log in to your account. Please try again.'

          toast.add({
            title: 'Sign in Failed',
            description: desc,
            color: 'error',
          })
        }
      }
    }

    async function signup(signupDto: SignupDto) {
      try {
        await AuthService.register(signupDto)

        toast.add({
          title: 'Account created',
          description: 'Your account has been successfully created. You can now log in.',
          color: 'success',
        })
        router.push({ name: 'signin' })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          const desc = err.response.data.message
            ? err.response.data.message
            : 'An error occurred while creating your account. Please try again.'

          toast.add({
            title: 'Sign Up Failed',
            description: desc,
            color: 'error',
          })
        }
      }
    }

    async function logout() {
      isAuthenticated.value = false
      user.value = undefined
      Object.assign(token, { accessToken: '', refreshToken: '' })
      router.push({ name: 'signin' })
    }

    function setUser(new_user: User) {
      user.value = new_user
    }

    function setToken(new_token: Token) {
      token.accessToken = new_token.accessToken
      token.refreshToken = new_token.refreshToken
    }

    function getAccessToken() {
      return token.accessToken
    }
    function getRefreshToken() {
      return token.refreshToken
    }

    return {
      isAuthenticated,
      user,
      token,
      getAccessToken,
      getRefreshToken,
      setUser,
      setToken,
      logout,
      signin,
      signup,
    }
  },
  { persist: true },
)
