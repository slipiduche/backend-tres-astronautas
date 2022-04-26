import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsMongoId,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly price: number;
  readonly owner: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
