import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ example: 'Board title' })
  @IsString()
  title: string;
}
