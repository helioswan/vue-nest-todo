import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { BoardService } from '../board.service';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let mockBoardService: Partial<BoardService>;
  let mockTaskModel: Partial<Model<Task>>;

  beforeEach(async () => {
    mockBoardService = {
      create: jest.fn(),
      findOne: jest.fn(),
      findMyBoards: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    mockTaskModel = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
      countDocuments: jest.fn(),
      updateMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: BoardService, useValue: mockBoardService },
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should throw NotFoundException if board does not exist', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Description',
        boardId: 'board-id',
      };
      (mockBoardService.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.create(createTaskDto, 'userId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should create and return a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Description',
        boardId: 'board-id',
      };
      const board = { _id: 'board-id', name: 'Test Board' }; // Mock board found
      (mockBoardService.findOne as jest.Mock).mockResolvedValue(board);
      (mockTaskModel.countDocuments as jest.Mock).mockResolvedValue(2);
      (mockTaskModel.create as jest.Mock).mockResolvedValue({
        ...createTaskDto,
        position: 2,
        userId: 'userId',
      });

      const result = await service.create(createTaskDto, 'userId');
      expect(result).toEqual({
        ...createTaskDto,
        position: 2,
        userId: 'userId',
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
      (mockTaskModel.find as jest.Mock).mockResolvedValue(tasks);

      const result = await service.findAll('userId');
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      (mockTaskModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('taskId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the task if found', async () => {
      const task = { _id: 'taskId', title: 'Task 1' };
      (mockTaskModel.findById as jest.Mock).mockResolvedValue(task);

      const result = await service.findOne('taskId');
      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      (mockTaskModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(
        service.update('taskId', updateTaskDto, 'userId'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update and return the task if found', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const updatedTask = { _id: 'taskId', ...updateTaskDto };
      (mockTaskModel.findOneAndUpdate as jest.Mock).mockResolvedValue(
        updatedTask,
      );

      const result = await service.update('taskId', updateTaskDto, 'userId');
      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if task does not exist', async () => {
      (mockTaskModel.findOne as jest.Mock).mockResolvedValue(null);
      (mockTaskModel.deleteOne as jest.Mock).mockResolvedValue({
        deletedCount: 0,
      });

      await expect(service.remove('taskId', 'userId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should remove the task successfully', async () => {
      const task = {
        title: 'New Task',
        description: 'Description',
        boardId: 'board-id',
        userId: 'user-id',
        _id: 'task-id',
      };

      (mockTaskModel.findOne as jest.Mock).mockResolvedValue(task);
      (mockTaskModel.deleteOne as jest.Mock).mockResolvedValue({
        deletedCount: 1,
      });
      (mockTaskModel.updateMany as jest.Mock).mockResolvedValue(task);

      await expect(service.remove('taskId', 'userId')).resolves.not.toThrow();
    });
  });
});
