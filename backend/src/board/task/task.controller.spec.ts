import { TaskService } from './task.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtPayload } from '../../auth/entities/jwt-payload.entity';

describe('TaskController', () => {
  let controller: TaskController;
  let mockTaskService: Partial<TaskService>;
  let mockAuthGuard: Partial<AuthGuard>;

  beforeEach(async () => {
    mockTaskService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findTasksByBoard: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<TaskController>(TaskController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'Task description',
      boardId: 'board-id',
    };
    const user: JwtPayload = {
      sub: 'user-id',
      username: 'user',
      email: 'email@adress.com',
    };

    (mockTaskService.create as jest.Mock).mockResolvedValue({
      id: '1',
      ...createTaskDto,
    });

    const result = await controller.create(createTaskDto, user);

    expect(result).toEqual({ id: '1', ...createTaskDto });
    expect(mockTaskService.create).toHaveBeenCalledWith(
      createTaskDto,
      user.sub,
    );
  });

  it('should get all tasks for the user', async () => {
    const user: JwtPayload = {
      sub: 'user-id',
      username: 'user',
      email: 'email@adress.com',
    };

    (mockTaskService.findAll as jest.Mock).mockResolvedValue([
      { id: '1', title: 'Task 1', description: 'Task 1 description' },
    ]);

    const result = await controller.findAll(user);

    expect(result).toEqual([
      { id: '1', title: 'Task 1', description: 'Task 1 description' },
    ]);
    expect(mockTaskService.findAll).toHaveBeenCalledWith(user.sub);
  });

  it('should get one task by id', async () => {
    const taskId = '1';

    (mockTaskService.findOne as jest.Mock).mockResolvedValue({
      id: taskId,
      title: 'Task 1',
      description: 'Task 1 description',
    });

    const result = await controller.findOne(taskId);

    expect(result).toEqual({
      id: taskId,
      title: 'Task 1',
      description: 'Task 1 description',
    });
    expect(mockTaskService.findOne).toHaveBeenCalledWith(taskId);
  });

  it('should update a task', async () => {
    const taskId = '1';
    const updateTaskDto = {
      title: 'Updated Task',
      description: 'Updated description',
    };
    const user: JwtPayload = {
      sub: 'user-id',
      username: 'user',
      email: 'email@adress.com',
    };

    (mockTaskService.update as jest.Mock).mockResolvedValue({
      id: taskId,
      ...updateTaskDto,
    });

    const result = await controller.update(taskId, updateTaskDto, user);

    expect(result).toEqual({ id: taskId, ...updateTaskDto });
    expect(mockTaskService.update).toHaveBeenCalledWith(
      taskId,
      updateTaskDto,
      user.sub,
    );
  });

  it('should delete a task', async () => {
    const taskId = '1';
    const user: JwtPayload = {
      sub: 'user-id',
      username: 'user',
      email: 'email@adress.com',
    };

    (mockTaskService.remove as jest.Mock).mockResolvedValue({
      id: taskId,
      title: 'Task 1',
      description: 'Task 1 description',
    });

    const result = await controller.remove(taskId, user);

    expect(result).toEqual({
      id: taskId,
      title: 'Task 1',
      description: 'Task 1 description',
    });
    expect(mockTaskService.remove).toHaveBeenCalledWith(taskId, user.sub);
  });
});
