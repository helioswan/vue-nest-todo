import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Model } from 'mongoose';
import { Board } from './schemas/board.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  async create(createBoardDto: CreateBoardDto, userId: string) {
    return await this.boardModel.create({
      title: createBoardDto.title,
      userId,
    });
  }

  async findMyBoards(userId: string) {
    return await this.boardModel.find({ userId });
  }

  async findOne(id: string) {
    return await this.boardModel.findOne({ _id: id });
  }

  async update(id: string, userId: string, updateBoardDto: UpdateBoardDto) {
    return await this.boardModel.findOne({ _id: id, userId }, updateBoardDto);
  }

  async remove(id: string, userId: string) {
    return await this.boardModel.deleteOne({ _id: id, userId });
  }
}
