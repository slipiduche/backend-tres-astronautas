import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { UpdateProductDto, CreateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll() {
    const all = await this.productModel.find().populate('owner').exec();
    return all.map((product) => ({
      ...product.toJSON(),
      owner: { ...product.toJSON().owner, password: 'null' },
    }));
  }
  async findAllByUser(id: string) {
    const allByUser = await this.productModel.find().populate('owner').exec();
    if (!allByUser) {
      throw new NotAcceptableException('Not valid');
    }
    if (allByUser.length > 0) {
      return allByUser.map((product) => ({
        ...product.toJSON(),
        owner: id,
      }));
    }
    return [];
  }
  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('owner')
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return {
      ...product.toJSON(),
      owner: { ...product.toJSON().owner, password: 'null' },
    };
  }
  async create(payload: CreateProductDto) {
    console.log(payload);
    const owner = new Types.ObjectId(payload.owner);
    const newProductObject = {
      name: payload.name,
      price: payload.price,
      owner,
    };
    const newProduct = await new this.productModel(payload);
    await newProduct.save();
    console.log(newProduct);
    return newProduct;
  }
  async update(id: string, payload: UpdateProductDto, userId: string) {
    const product = await this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Not found`);
    }
    console.log(product);
    if (!(userId === product.owner._id.toString())) {
      throw new NotAcceptableException(
        `Unauthorized #${userId}!=${product.owner._id}`,
      );
    }
    const productUpdated = await this.productModel
      .findByIdAndUpdate(
        id,
        { $set: { ...payload, owner: userId } },
        { new: true },
      )
      .exec();

    await productUpdated.save();
    return productUpdated;
  }

  async remove(id: string, userId: string) {
    const product = await this.findOne(id);
    if (!product || !(userId == product.owner._id.toString())) {
      throw new NotAcceptableException(`Unauthorized`);
    }
    return await this.productModel.findByIdAndDelete(id);
  }
}
