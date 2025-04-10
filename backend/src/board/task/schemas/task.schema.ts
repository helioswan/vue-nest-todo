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
  boardId: mongoose.Types.ObjectId;

  @Prop()
  position: number;

  @Prop({ default: TaskStatus.TODO, type: String, enum: TaskStatus })
  state: TaskStatus;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
