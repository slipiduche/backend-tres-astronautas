import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private counterId: number = 0;

  findAll() {
    return this.products;
  }
  findOne(id: string) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId.toString(),
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: string, payload: any) {
    this.counterId = this.counterId + 1;
    const product = this.findOne(id);

    if (product && (payload.id === id || payload.id === undefined)) {
      ///update with database actions
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = { ...this.products[index], ...payload };
      return this.products[index];
    }
    throw new NotAcceptableException(`Unauthorized`);
  }

  remove(id: string) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    this.products.splice(index, 1);
    return true;
  }
}
