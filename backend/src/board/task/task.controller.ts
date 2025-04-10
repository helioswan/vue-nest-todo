import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ActiveUser } from '../../auth/active-user.decorator';
import { JwtPayload } from '../../auth/entities/jwt-payload.entity';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser() user: JwtPayload,
  ) {
    const task = await this.taskService.create(createTaskDto, user.sub);
    return {
      message: 'Task successfully created',
      task,
    };
  }

  @Get()
  async findAll(@ActiveUser() user: JwtPayload) {
    const tasks = await this.taskService.findAll(user.sub);
    return {
      message: 'Tasks successfully retrieved',
      tasks,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);
    return {
      message: 'Task successfully retrieved',
      task,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @ActiveUser() user: JwtPayload,
  ) {
    const updatedTask = await this.taskService.update(
      id,
      updateTaskDto,
      user.sub,
    );
    return {
      message: 'Task successfully updated',
      updatedTask,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ActiveUser() user: JwtPayload) {
    await this.taskService.remove(id, user.sub);
    return {
      message: 'Task successfully removed',
    };
  }
}
