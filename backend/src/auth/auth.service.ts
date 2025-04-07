import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@users/schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '../database/mongo/schema/refresh-token.schema';
import { RefreshTokenDto } from './dto/refresh-dto.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;

    const usedEmail = await this.UserModel.findOne({
      email,
    });

    if (usedEmail) throw new ConflictException('Email already used');

    bcrypt.hash(password, 10, async (err: Error | undefined, hash: string) => {
      if (!err) await this.UserModel.create({ email, name, password: hash });
    });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.UserModel.findOne({ email });

    if (!user) throw new UnauthorizedException();

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return await this.generateAccessToken(user._id as ObjectId);
    } else {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    const storedRefreshToken = await this.RefreshTokenModel.findOne({
      refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!storedRefreshToken) {
      throw new UnauthorizedException();
    }

    return this.generateAccessToken(storedRefreshToken.userId);
  }

  private async generateAccessToken(userId: ObjectId) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async storeRefreshToken(refreshToken: string, userId: ObjectId) {
    const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    await this.RefreshTokenModel.findOneAndUpdate(
      {
        token: refreshToken,
        userId,
      },
      { $set: { expiryDate: expiryDate } },
    );
  }
}
