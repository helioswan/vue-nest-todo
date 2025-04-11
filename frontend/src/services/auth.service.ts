import type { SigninDto } from '@/dto/signin.dto'
import type { SignupDto } from '@/dto/signup.dto'
import api from './api.service'

async function login(signinDto: SigninDto) {
  return await api.post('/auth/login', signinDto)
}

function register(signupDto: SignupDto) {
  return api.post('/auth/signup', signupDto)
}

export default { login, register }
