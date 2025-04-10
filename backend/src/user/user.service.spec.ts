import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let mockUserModel: Partial<Model<User>>;

  beforeEach(async () => {
    mockUserModel = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      };
      const createdUser = { ...createUserDto, _id: 'user123' };
      (mockUserModel.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(createdUser);
      expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const userId = 'user123';
      const foundUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        _id: userId,
      };
      (mockUserModel.findById as jest.Mock).mockResolvedValue(foundUser);

      const result = await service.findOne(userId);

      expect(result).toEqual({
        name: foundUser.name,
        email: foundUser.email,
      });
      expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if no user found', async () => {
      const userId = 'user123';
      (mockUserModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const email = 'john.doe@example.com';
      const foundUser = { name: 'John Doe', email, _id: 'user123' };
      (mockUserModel.findOne as jest.Mock).mockResolvedValue(foundUser);

      const result = await service.findByEmail(email);

      expect(result).toEqual(foundUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
    });

    it('should return null if no user found', async () => {
      const email = 'john.doe@example.com';
      (mockUserModel.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.findByEmail(email);

      expect(result).toBeNull();
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
    });
  });
});
