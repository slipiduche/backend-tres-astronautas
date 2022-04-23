export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  readonly owner: string;
}
export class UpdateProductDto {
  readonly name?: string;
  readonly price?: number;
  readonly owner?: string;
}
