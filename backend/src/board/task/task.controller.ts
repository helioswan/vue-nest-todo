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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/active-user.decorator';
import { JwtPayload } from 'src/auth/entities/jwt-payload.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @ActiveUser() user: JwtPayload) {
    return this.taskService.create(createTaskDto, user.sub);
  }

  @Get()
  findAll(@ActiveUser() user: JwtPayload) {
    return this.taskService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @ActiveUser() user: JwtPayload,
  ) {
    return this.taskService.update(id, updateTaskDto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: JwtPayload) {
    return this.taskService.remove(id, user.sub);
  }
}
