import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/entities/jwt-payload.entity';
import { ActiveUser } from 'src/auth/active-user.decorator';
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
  create(
    @Body() createBoardDto: CreateBoardDto,
    @ActiveUser() user: JwtPayload,
  ) {
    return this.boardService.create(createBoardDto, user.sub);
  }

  @Get()
  findMyBoards(@ActiveUser() user: JwtPayload) {
    return this.boardService.findMyBoards(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Get(':boardId/tasks')
  getTasks(@Param('boardId') boardId: string) {
    return this.taskService.findTasksByBoard(boardId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @ActiveUser() user: JwtPayload,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(id, user.sub, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: JwtPayload) {
    return this.boardService.remove(id, user.sub);
  }
}
