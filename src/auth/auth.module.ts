import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Pai } from 'src/pais/entities/pai.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService],
  exports: [TypeOrmModule, JwtModule, PassportModule, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Pai]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '12h',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
