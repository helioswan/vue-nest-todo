import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

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

  @ApiProperty({ example: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  position?: number;
}
