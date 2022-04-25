import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  id: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  password?: string;
  @Prop({ required: true })
  name: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
