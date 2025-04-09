import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: mongoose.Types.ObjectId;

  //   @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  //   members: Types.ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
