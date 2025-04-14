import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ example: 'Board title' })
  @MaxLength(100)
  @IsString()
  title: string;
}
