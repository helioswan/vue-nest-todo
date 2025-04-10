import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ActiveUser } from '../auth/active-user.decorator';
import { JwtPayload } from '../auth/entities/jwt-payload.entity';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@ActiveUser() user: JwtPayload) {
    return this.userService.findOne(user.sub);
  }
}
