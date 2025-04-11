import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RefreshToken } from './schemas/refresh-token.schema';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-dto.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: Partial<UserService>;
  let mockJwtService: Partial<JwtService>;
  let mockRefreshTokenModel: Partial<Model<RefreshToken>>;
  const mockBcrypt = bcrypt;

  beforeEach(async () => {
    mockJwtService = {
      sign: jest.fn(() => 'mockAccessToken'),
    };

    mockRefreshTokenModel = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    };

    mockUserService = {
      create: jest.fn(),
      findOne: jest.fn(),
      findByEmail: jest.fn(),
    };

    mockBcrypt.compare = jest.fn();
    mockBcrypt.hashSync = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: getModelToken(RefreshToken.name),
          useValue: mockRefreshTokenModel,
        },
      ],
    }).compile();

    mockUserService = module.get<UserService>(UserService);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should throw ConflictException if email is already used', async () => {
      (mockUserService.findByEmail as jest.Mock).mockResolvedValue({
        _id: '123456789',
        email: 'email@adress.com',
        password: 'hashedpassword',
        username: 'username',
      });

      const dto: SignupDto = {
        email: 'email@adress.com',
        password: 'password',
        username: 'username',
      };

      await expect(service.signup(dto)).rejects.toThrow(ConflictException);
    });

    it('should return email and username if signup is successful', async () => {
      (mockUserService.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hashSync as jest.Mock).mockResolvedValue('hashed');

      const dto: SignupDto = {
        email: 'email@adress.com',
        password: 'password',
        username: 'username',
      };
      const result = await service.signup(dto);
      expect(result).toEqual({
        email: 'email@adress.com',
        username: 'username',
      });
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      (mockUserService.findByEmail as jest.Mock).mockResolvedValue(null);
      const dto: LoginDto = { email: 'email@adress.com', password: 'password' };
      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      (mockUserService.findByEmail as jest.Mock).mockResolvedValue({
        _id: '123456789',
        username: 'username',
        email: 'email@adress.com',
        password: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const dto: LoginDto = { email: 'email@adress.com', password: 'password' };
      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should return tokens if login is successful', async () => {
      (mockUserService.findByEmail as jest.Mock).mockResolvedValue({
        _id: '123456789',
        username: 'username',
        email: 'email@adress.com',
        password: 'hashed',
      });
      (mockUserService.findOne as jest.Mock).mockResolvedValue({
        _id: '123456789',
        username: 'username',
        email: 'email@adress.com',
        password: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (mockRefreshTokenModel.findOneAndUpdate as jest.Mock).mockResolvedValue({
        userId: 'user-id',
        expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        token: 'mockRefreshToken',
      });

      const dto: LoginDto = { email: 'email@adress.com', password: 'password' };
      const result = await service.login(dto);

      expect(result).toHaveProperty('accessToken', 'mockAccessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException if token is not found or expired', async () => {
      (mockRefreshTokenModel.findOne as jest.Mock).mockResolvedValue(null);
      const dto: RefreshTokenDto = { refreshToken: 'bad-token' };
      await expect(service.refreshToken(dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return new tokens if refresh token is valid', async () => {
      (mockRefreshTokenModel.findOne as jest.Mock).mockResolvedValue({
        userId: 'user-id',
        token: 'valid-token',
        expiryDate: new Date(Date.now() + 1000),
      });
      (mockRefreshTokenModel.findOneAndUpdate as jest.Mock).mockResolvedValue({
        userId: 'user-id',
        token: 'valid-token',
        expiryDate: new Date(Date.now() + 1000),
      });
      (mockUserService.findOne as jest.Mock).mockResolvedValue({
        _id: '123456789',
        username: 'username',
        email: 'email@adress.com',
        password: 'hashed',
      });

      const dto: RefreshTokenDto = { refreshToken: 'valid-token' };
      const result = await service.refreshToken(dto);
      expect(result).toHaveProperty('accessToken', 'mockAccessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });
});
