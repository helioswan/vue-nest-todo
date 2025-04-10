import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task title' })
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  title: string;

  @ApiProperty({ example: 'Task description' })
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ example: '67f5e3c6fbe7e8ca8fa1241a' })
  @IsString()
  boardId: string;
}
