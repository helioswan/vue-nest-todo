import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException();

    return {
      username: user.username,
      email: user.email,
    };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
