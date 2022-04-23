import { ProductsService } from '../../services/products/products.service';
import { UpdateProductDto, CreateProductDto } from '../../dtos/products.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.findAll();
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    const res = this.productsService.findOne(productId);
    if (res) {
      return res;
    }
    return { message: 'not founded' };
  }
  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    const resp = this.productsService.create(payload);
    return {
      message: 'product created',
      product: resp,
    };
  }
  @Put(':productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    const res = this.productsService.update(productId, payload);
    if (res) {
      return {
        message: `Product ${productId} updated`,
        product: res,
      };
    }
    return {
      message: `Product ${productId} not updated`,
    };
  }
  @Delete(':productId')
  deleteProduct(@Param('productId') productId: string) {
    return this.productsService.remove(productId);
  }
}
