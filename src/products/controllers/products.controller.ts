import { UpdateProductDto, CreateProductDto } from '../dtos/products.dto';
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
import { MongoIdPipe } from '../../common/mongoid.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @ApiOperation({ summary: 'List of products' })
  @Get()
  async getProducts() {
    return await this.productsService.findAll();
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getProduct(@Param('productId', MongoIdPipe) productId: string) {
    const res = await this.productsService.findOne(productId);
    if (res) {
      return res;
    }
    return { message: 'not founded' };
  }
  @Post()
  async createProduct(@Body() payload: CreateProductDto) {
    const resp = await this.productsService.create(payload);
    return {
      message: 'product created',
      product: resp,
    };
  }
  @Put(':productId')
  async updateProduct(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    const res = await this.productsService.update(productId, payload);
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
  async deleteProduct(@Param('productId', MongoIdPipe) productId: string) {
    return await this.productsService.remove(productId);
  }
}
