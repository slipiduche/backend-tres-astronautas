import { Injectable } from '@nestjs/common';

import { ProductsService } from '../../../products/services/products.service';

@Injectable()
export class OwnerService {
  constructor(private productService: ProductsService) {}

  async findAllByUser(id: string) {
    return this.productService.findAllByUser(id);
  }
}
