import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class RefreshToken {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop({ required: true })
  expiryDate: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
