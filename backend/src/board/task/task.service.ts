import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { BoardService } from '../board.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @Inject(forwardRef(() => BoardService))
    private boardService: BoardService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const board = await this.boardService.findOne(createTaskDto.boardId);
    if (!board) throw new NotFoundException();

    const tasks = await this.taskModel.find({
      boardId: board._id.toString(),
    });
    const position = tasks.length;

    return await this.taskModel.create({
      ...createTaskDto,
      position,
      userId,
    });
  }

  findAll(userId: string) {
    return this.taskModel.find({ userId });
  }

  findTasksByBoard(boardId: string) {
    return this.taskModel.find({ boardId });
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id);

    if (!task) throw new NotFoundException();
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id, userId },
      updateTaskDto,
      { new: true },
    );

    if (!updatedTask) throw new NotFoundException();

    return updatedTask;
  }

  async remove(id: string, userId: string) {
    const result = await this.taskModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
