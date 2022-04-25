import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @Length(6)
  @IsNotEmpty()
  @ApiProperty({ description: "the user' password", deprecated: true })
  readonly password: string;
  readonly role: string;
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
