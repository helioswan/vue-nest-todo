import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'List' })
  list: mongoose.Types.ObjectId;

  @Prop()
  position: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);
