import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { SignupDto } from './dtos/signup.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup(signupDto: SignupDto) {}
  async login(loginDto: LoginDto) {}
  async refresh(refreshTokenDto: RefreshTokenDto) {}
}
