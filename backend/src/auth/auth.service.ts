import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { RefreshTokenDto } from './dto/refresh-dto.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';
import { JwtPayload } from './entities/jwt-payload.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;
    const saltRounds = 10;

    const usedEmail = await this.userService.findByEmail(email);
    if (usedEmail !== null) throw new ConflictException('Email already used');

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (!hashedPassword) throw new InternalServerErrorException();

    await this.userService.create({ email, name, password: hashedPassword });
    return { email, name };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException();

    return await this.generateAccessToken(user._id.toString());
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    const storedRefreshToken = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!storedRefreshToken) {
      throw new UnauthorizedException();
    }

    return this.generateAccessToken(storedRefreshToken.userId.toString());
  }

  private async generateAccessToken(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException();

    const payload: JwtPayload = {
      sub: userId,
      username: user.name,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async storeRefreshToken(refreshToken: string, userId: string) {
    const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const newToken = await this.refreshTokenModel.findOneAndUpdate(
      {
        userId,
      },
      { expiryDate: expiryDate, token: refreshToken },
      { new: true, upsert: true },
    );
    if (!newToken) throw new InternalServerErrorException();
  }
}
