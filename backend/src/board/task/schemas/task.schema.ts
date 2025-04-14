import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TaskStatus } from '../enums/TaskStatus.enum';

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  boardId: string;

  @Prop({ default: TaskStatus.TODO, type: String, enum: TaskStatus })
  status: TaskStatus;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
