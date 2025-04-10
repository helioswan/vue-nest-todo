import { BoardService } from './board.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtPayload } from '../auth/entities/jwt-payload.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { TaskService } from './task/task.service';
import { Board } from './schemas/board.schema';

describe('BoardController', () => {
  let controller: BoardController;
  let mockBoardService: Partial<BoardService>;
  let mockTaskService: Partial<TaskService>;
  let mockAuthGuard: Partial<AuthGuard>;
  let user: JwtPayload;
  let board: Partial<Board>;
  let boards: Partial<Board[]>;

  beforeEach(async () => {
    mockBoardService = {
      create: jest.fn(),
      findMyBoards: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    mockTaskService = {
      findTasksByBoard: jest.fn(),
    };

    mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    user = {
      sub: 'user123',
      username: 'username',
      email: 'email@adress.com',
    };

    board = { title: 'My Board', userId: user.sub };

    boards = [{ title: 'My Board', userId: user.sub }];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        { provide: BoardService, useValue: mockBoardService },
        { provide: TaskService, useValue: mockTaskService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<BoardController>(BoardController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a board with user id', async () => {
      const dto: CreateBoardDto = { title: 'My Board' };
      (mockBoardService.create as jest.Mock).mockResolvedValue(board);

      const response = {
        message: 'Board created successfully',
        data: board,
      };
      const result = await controller.create(dto, user);
      expect(result).toEqual(response);
      expect(mockBoardService.create).toHaveBeenCalledWith(dto, user.sub);
    });
  });

  describe('findMyBoards', () => {
    it('should return all boards for the user', async () => {
      (mockBoardService.findMyBoards as jest.Mock).mockResolvedValue(boards);

      const response = {
        message: 'Boards retrieved successfully',
        data: boards,
      };
      const result = await controller.findMyBoards(user);
      expect(result).toEqual(response);
      expect(mockBoardService.findMyBoards).toHaveBeenCalledWith(user.sub);
    });
  });

  describe('findOne', () => {
    it('should return a board by id', async () => {
      (mockBoardService.findOne as jest.Mock).mockResolvedValue(board);

      const response = {
        message: 'Board retrieved successfully',
        data: board,
      };
      const result = await controller.findOne('1');
      expect(result).toEqual(response);
      expect(mockBoardService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('getTasks', () => {
    it('should return all tasks for a board', async () => {
      const tasks = [{ _id: 't1', boardId: '1', title: 'Task 1' }];
      (mockTaskService.findTasksByBoard as jest.Mock).mockResolvedValue(tasks);

      const response = {
        message: 'Tasks retrieved successfully',
        data: tasks,
      };
      const result = await controller.getTasks('1');
      expect(result).toEqual(response);
      expect(mockTaskService.findTasksByBoard).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a board by id and user', async () => {
      const dto: UpdateBoardDto = { title: 'Updated Title' };
      const updated = { _id: '1', title: 'Updated Title' };
      (mockBoardService.update as jest.Mock).mockResolvedValue(updated);

      const response = {
        message: 'Board updated successfully',
        data: updated,
      };
      const result = await controller.update('1', user, dto);
      expect(result).toEqual(response);
      expect(mockBoardService.update).toHaveBeenCalledWith('1', user.sub, dto);
    });
  });

  describe('remove', () => {
    it('should remove a board by id and user', async () => {
      const serviceResponse = { deletedCount: 1 };
      (mockBoardService.remove as jest.Mock).mockResolvedValue(serviceResponse);

      const response = { message: 'Board deleted successfully' };
      const result = await controller.remove('1', user);
      expect(result).toEqual(response);
      expect(mockBoardService.remove).toHaveBeenCalledWith('1', user.sub);
    });
  });
});
