import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-dto.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn((signupDto: SignupDto) => {
      return {
        email: signupDto.email,
        id: '123456789',
        username: signupDto.username,
      };
    }),
    login: jest.fn(() => {
      return {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
      };
    }),
    refreshToken: jest.fn(() => {
      return {
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup with correct data and return confirmation message', async () => {
      const dto: SignupDto = {
        email: 'email@adress.com',
        password: '1234',
        username: 'Test',
      };

      const result = await controller.signup(dto);
      expect(result).toEqual({
        message: 'User successfully registered',
        user: {
          email: dto.email,
          id: '123456789',
          username: dto.username,
        },
      });
      expect(mockAuthService.signup).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should return tokens on successful login', async () => {
      const dto: LoginDto = { email: 'email@adress.com', password: '1234' };

      const result = await controller.login(dto);

      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        message: 'User successfully logged in',
        data: {
          accessToken: 'mockAccessToken',
          refreshToken: 'mockRefreshToken',
        },
      });
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens on refreshToken call', async () => {
      const dto: RefreshTokenDto = { refreshToken: 'oldRefreshToken' };

      const result = await controller.refreshToken(dto);

      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        message: 'Access token successfully refreshed',
        data: {
          accessToken: 'newAccessToken',
          refreshToken: 'newRefreshToken',
        },
      });
    });
  });
});
