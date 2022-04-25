import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password?: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
