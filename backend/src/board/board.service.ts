import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Model } from 'mongoose';
import { Board } from './schemas/board.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  create(createBoardDto: CreateBoardDto, userId: string) {
    return this.boardModel.create({
      title: createBoardDto.title,
      userId,
    });
  }

  findMyBoards(userId: string) {
    return this.boardModel.find({ userId });
  }

  async findOne(id: string) {
    const board = await this.boardModel.findOne({ _id: id });
    if (!board) throw new NotFoundException();

    return board;
  }

  update(id: string, userId: string, updateBoardDto: UpdateBoardDto) {
    return this.boardModel.findOneAndUpdate(
      { _id: id, userId },
      updateBoardDto,
      { new: true },
    );
  }

  async remove(id: string, userId: string) {
    const result = await this.boardModel.deleteOne({ _id: id, userId });

    if (result.deletedCount === 0) {
      throw new NotFoundException();
    }

    return result;
  }
}
