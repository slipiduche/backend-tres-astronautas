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
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MongoIdPipe } from '../../common/mongoid.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { PayloadToken } from 'src/auth/models/token.model';


@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @ApiOperation({ summary: 'List of products' })
  @Get()
  @Public()
  async getProducts() {
    return await this.productsService.findAll();
  }
  @Get(':productId')
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  async getProduct(@Param('productId', MongoIdPipe) productId: string) {
    const res = await this.productsService.findOne(productId);
    if (res) {
      return res;
    }
    return { message: 'not founded' };
  }
  @Post()
  async createProduct(@Req() req: Request, @Body() payload: CreateProductDto) {
    const user = req.user as PayloadToken;
    const owner = user.sub; //new Types.ObjectId(user.sub);
    const resp = await this.productsService.create({
      ...payload,
      owner,
    });
    return {
      message: 'product created',
      product: resp,
    };
  }
  @Put(':productId')
  async updateProduct(
    @Req() req: Request,
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    const user = req.user as PayloadToken;
    const res = await this.productsService.update(productId, payload, user.sub);
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
  async deleteProduct(
    @Req() req: Request,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    const user = req.user as PayloadToken;

    return await this.productsService.remove(productId, user.sub);
  }
}
