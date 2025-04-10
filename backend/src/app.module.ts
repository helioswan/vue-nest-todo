import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BoardModule } from './board/board.module';
import { TaskModule } from './board/task/task.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    MongooseModule.forRoot(process.env.DB_URI as string, {
      dbName: process.env.DB_NAME,
      auth: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UserModule,
    BoardModule,
    TaskModule,
  ],
})
export class AppModule {}
