import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

export const ActiveUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const request: AuthenticatedRequest = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
  },
);
