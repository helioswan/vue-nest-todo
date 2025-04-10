import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task title' })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  title?: string;

  @ApiProperty({ example: 'Task description' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
}
