import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtPayload } from '../auth/entities/jwt-payload.entity';
import { ActiveUser } from '../auth/active-user.decorator';
import { TaskService } from './task/task.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
  ) {}

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @ActiveUser() user: JwtPayload,
  ) {
    const board = await this.boardService.create(createBoardDto, user.sub);
    return {
      message: 'Board created successfully',
      data: board,
    };
  }

  @Get()
  async findMyBoards(@ActiveUser() user: JwtPayload) {
    const boards = await this.boardService.findMyBoards(user.sub);
    return {
      message: 'Boards retrieved successfully',
      data: boards,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardService.findOne(id);
    return {
      message: 'Board retrieved successfully',
      data: board,
    };
  }

  @Get(':boardId/tasks')
  async getTasks(@Param('boardId') boardId: string) {
    const tasks = await this.taskService.findTasksByBoard(boardId);
    return {
      message: 'Tasks retrieved successfully',
      data: tasks,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @ActiveUser() user: JwtPayload,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const updatedBoard = await this.boardService.update(
      id,
      user.sub,
      updateBoardDto,
    );
    return {
      message: 'Board updated successfully',
      data: updatedBoard,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ActiveUser() user: JwtPayload) {
    await this.boardService.remove(id, user.sub);
    return {
      message: 'Board deleted successfully',
    };
  }
}
