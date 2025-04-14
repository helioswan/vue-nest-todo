import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from '../enums/TaskStatus.enum';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task title' })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Task description' })
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ example: TaskStatus.IN_PROGRESS })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
