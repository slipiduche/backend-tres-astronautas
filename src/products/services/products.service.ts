import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { UpdateProductDto, CreateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll() {
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
  async update(id: string, payload: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    await product.save();
    if (!product) {
      throw new NotAcceptableException(`Unauthorized`);
    }
    return product;
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
