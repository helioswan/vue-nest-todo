import { Request } from 'express';
import { JwtPayload } from '../entities/jwt-payload.entity';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
