import { Schema } from '@nestjs/mongoose';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class CreateUserDto {
  @ApiProperty({ example: 'Name' })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({ example: 'email@adress.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(8)
  password: string;
}
