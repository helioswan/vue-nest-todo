import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ example: 'Board title' })
  @IsString()
  title: string;
}
