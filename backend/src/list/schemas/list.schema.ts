import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class List {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true })
  board: mongoose.Types.ObjectId;

  @Prop()
  position: number;
}

export const ListSchema = SchemaFactory.createForClass(List);
