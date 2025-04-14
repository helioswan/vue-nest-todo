import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ example: 'Board title' })
  @MaxLength(100)
  @IsString()
  title: string;
}
