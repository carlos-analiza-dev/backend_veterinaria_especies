import { Module } from '@nestjs/common';
import { ProfileImagesService } from './profile_images.service';
import { ProfileImagesController } from './profile_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImage } from './entities/profile_image.entity';
import { User } from 'src/auth/entities/auth.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfileImagesController],
  imports: [
    TypeOrmModule.forFeature([ProfileImage, User]),
    ConfigModule,
    AuthModule,
  ],
  providers: [ProfileImagesService],
})
export class ProfileImagesModule {}
