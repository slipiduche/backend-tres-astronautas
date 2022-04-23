import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly price: number;
  @IsNotEmpty()
  @IsString()
  readonly owner: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
