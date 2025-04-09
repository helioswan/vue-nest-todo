import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: '991ce972-7b57-433e-b5b4-166be382ee22' })
  @IsString()
  refreshToken: string;
}
