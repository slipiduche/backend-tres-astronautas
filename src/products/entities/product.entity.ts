import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
@Schema()
export class Product extends Document {
  @Prop()
  id: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  price: number;
  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User | Types.ObjectId;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
