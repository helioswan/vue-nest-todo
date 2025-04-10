import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JwtPayload } from '../auth/entities/jwt-payload.entity';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: Partial<UserService>;
  let mockAuthGuard: Partial<AuthGuard>;
  let userId: string;
  let profile: JwtPayload;

  beforeEach(async () => {
    mockUserService = {
      findOne: jest.fn(),
    };

    mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    userId = 'userId';
    profile = {
      sub: userId,
      username: 'john.doe',
      email: 'john.doe@example.com',
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UserController>(UserController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return the user profile', async () => {
      (mockUserService.findOne as jest.Mock).mockResolvedValue(profile);

      const result = await controller.getProfile(profile);

      expect(result).toEqual(profile);
      expect(mockUserService.findOne).toHaveBeenCalledWith(userId);
    });
  });
});
