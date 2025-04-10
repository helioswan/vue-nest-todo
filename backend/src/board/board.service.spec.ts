import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { NotFoundException } from '@nestjs/common';

describe('BoardService', () => {
  let service: BoardService;
  let mockBoardModel: Partial<Model<Board>>;
  let userId: string;
  let boardId: string;

  beforeEach(async () => {
    mockBoardModel = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
    };

    userId = 'user123';
    boardId = 'board123';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getModelToken(Board.name),
          useValue: mockBoardModel,
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new board', async () => {
      const createBoardDto: CreateBoardDto = { title: 'Test Board' };
      const createdBoard = { ...createBoardDto, userId };

      (mockBoardModel.create as jest.Mock).mockResolvedValue(createdBoard);

      const result = await service.create(createBoardDto, userId);
      expect(result).toEqual(createdBoard);
      expect(mockBoardModel.create).toHaveBeenCalledWith({
        title: createBoardDto.title,
        userId,
      });
    });
  });

  describe('findMyBoards', () => {
    it('should return a list of boards', async () => {
      const boards = [
        { title: 'Board 1', userId },
        { title: 'Board 2', userId },
      ];

      (mockBoardModel.find as jest.Mock).mockResolvedValue(boards);

      const result = await service.findMyBoards(userId);
      expect(result).toEqual(boards);
      expect(mockBoardModel.find).toHaveBeenCalledWith({ userId });
    });
  });

  describe('findOne', () => {
    it('should return a board if found', async () => {
      const board = { title: 'Test Board', userId: 'user123' };

      (mockBoardModel.findOne as jest.Mock).mockResolvedValue(board);

      const result = await service.findOne(boardId);
      expect(result).toEqual(board);
      expect(mockBoardModel.findOne).toHaveBeenCalledWith({ _id: boardId });
    });

    it('should throw NotFoundException if no board found', async () => {
      (mockBoardModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(boardId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the board', async () => {
      const updateBoardDto: UpdateBoardDto = { title: 'Updated Board' };
      const updatedBoard = { ...updateBoardDto, userId };

      (mockBoardModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
        updatedBoard,
      );

      const result = await service.update(boardId, userId, updateBoardDto);
      expect(result).toEqual(updatedBoard);
      expect(mockBoardModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: boardId, userId },
        updateBoardDto,
        { new: true },
      );
    });
  });

  describe('remove', () => {
    it('should remove the board', async () => {
      const deleteResult = { deletedCount: 1 };

      (mockBoardModel.deleteOne as jest.Mock).mockResolvedValue(deleteResult);

      const result = await service.remove(boardId, userId);
      expect(result).toEqual(deleteResult);
      expect(mockBoardModel.deleteOne).toHaveBeenCalledWith({
        _id: boardId,
        userId,
      });
    });

    it('should throw NotFoundException if board not found', async () => {
      const deleteResult = { deletedCount: 0 };

      (mockBoardModel.deleteOne as jest.Mock).mockResolvedValue(deleteResult);

      await expect(service.remove(boardId, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
