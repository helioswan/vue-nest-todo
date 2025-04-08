import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  @InjectModel(User.name) private UserModel: Model<User>;

  async create(createUserDto: CreateUserDto) {
    return await this.UserModel.create(createUserDto);
  }

  async findAll() {
    return await this.UserModel.find();
  }

  async findOne(id: number) {
    return await this.UserModel.findById(id);
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.UserModel.deleteOne({ _id: id });
  }
}
