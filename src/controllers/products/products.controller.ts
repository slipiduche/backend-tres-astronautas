import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
@Controller('products')
export class ProductsController {
  @Get()
  getProducts() {
    return 'products';
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    return { product: productId };
  }
  @Post()
  createProduct(@Body() payload: any) {
    const { id, name, price, owner } = payload;
    return {
      message: 'product created',
      product: { id, name, price, owner },
    };
  }
  @Put(':productId')
  updateProduct(@Param('productId') productId: string, @Body() payload: any) {
    const { id, name, price, owner } = payload;
    return {
      message: `Product ${productId} updated`,
      product: { id, name, price, owner },
    };
  }
  @Delete(':productId')
  deleteProduct(@Param('productId') productId: string) {
    return {
      message: `Product ${productId} deleted`,
    };
  }
}
