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
  let user: JwtPayload;

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

    user = {
      sub: 'user-id',
      username: 'user',
      email: 'email@adress.com',
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

    (mockTaskService.create as jest.Mock).mockResolvedValue({
      id: '1',
      ...createTaskDto,
    });

    const response = {
      message: 'Task successfully created',
      task: {
        id: '1',
        ...createTaskDto,
      },
    };
    const result = await controller.create(createTaskDto, user);

    expect(result).toEqual(response);
    expect(mockTaskService.create).toHaveBeenCalledWith(
      createTaskDto,
      user.sub,
    );
  });

  it('should get all tasks for the user', async () => {
    (mockTaskService.findAll as jest.Mock).mockResolvedValue([
      { id: '1', title: 'Task 1', description: 'Task 1 description' },
    ]);

    const reponse = {
      message: 'Tasks successfully retrieved',
      tasks: [{ id: '1', title: 'Task 1', description: 'Task 1 description' }],
    };
    const result = await controller.findAll(user);

    expect(result).toEqual(reponse);
    expect(mockTaskService.findAll).toHaveBeenCalledWith(user.sub);
  });

  it('should get one task by id', async () => {
    const taskId = '1';

    (mockTaskService.findOne as jest.Mock).mockResolvedValue({
      id: taskId,
      title: 'Task 1',
      description: 'Task 1 description',
    });

    const response = {
      message: 'Task successfully retrieved',
      task: {
        id: taskId,
        title: 'Task 1',
        description: 'Task 1 description',
      },
    };
    const result = await controller.findOne(taskId);
    expect(result).toEqual(response);
    expect(mockTaskService.findOne).toHaveBeenCalledWith(taskId);
  });

  it('should update a task', async () => {
    const taskId = '1';
    const updateTaskDto = {
      title: 'Updated Task',
      description: 'Updated description',
    };

    (mockTaskService.update as jest.Mock).mockResolvedValue({
      id: taskId,
      ...updateTaskDto,
    });

    const response = {
      message: 'Task successfully updated',
      updatedTask: {
        id: taskId,
        ...updateTaskDto,
      },
    };
    const result = await controller.update(taskId, updateTaskDto, user);
    expect(result).toEqual(response);
    expect(mockTaskService.update).toHaveBeenCalledWith(
      taskId,
      updateTaskDto,
      user.sub,
    );
  });

  it('should delete a task', async () => {
    const taskId = '1';

    (mockTaskService.remove as jest.Mock).mockResolvedValue({
      id: taskId,
      title: 'Task 1',
      description: 'Task 1 description',
    });

    const response = {
      message: 'Task successfully removed',
    };

    const result = await controller.remove(taskId, user);
    expect(result).toEqual(response);
    expect(mockTaskService.remove).toHaveBeenCalledWith(taskId, user.sub);
  });
});
