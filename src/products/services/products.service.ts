import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PayloadToken } from 'src/auth/models/token.model';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateProductDto, CreateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll() {
    return this.productModel.find().populate('owner').exec();
  }
  async findAllByUser(id: string) {
    return this.productModel.find().populate('owner').exec();
  }
  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('owner')
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  async create(payload: CreateProductDto) {
    console.log(payload);
    const newProduct = await new this.productModel(payload);
    await newProduct.save();
    console.log(newProduct);
    return newProduct;
  }
  async update(id: string, payload: UpdateProductDto, userId: string) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!product || !userId == product.toJSON().owner._id) {
      throw new NotAcceptableException(`Unauthorized`);
    }

    await product.save();
    return product;
  }

  async remove(id: string, userId: string) {
    const product = await this.findOne(id);
    if (!product || !userId == product.toJSON().owner._id) {
      throw new NotAcceptableException(`Unauthorized`);
    }
    return await this.productModel.findByIdAndDelete(id);
  }
}
