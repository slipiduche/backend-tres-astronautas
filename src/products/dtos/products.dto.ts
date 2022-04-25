import { IsString, IsNumber, IsNotEmpty, IsPositive, IsMongoId } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

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
  @IsMongoId()
  readonly owner: string;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
