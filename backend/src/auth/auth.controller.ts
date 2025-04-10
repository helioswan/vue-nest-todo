import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-dto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);
    return {
      message: 'User successfully registered',
      user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);
    return {
      message: 'User successfully logged in',
      data: tokens,
    };
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refreshToken(refreshTokenDto);
    return {
      message: 'Access token successfully refreshed',
      data: tokens,
    };
  }
}
