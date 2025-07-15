import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseUUIDPipe,
  Get,
  Delete,
  BadRequestException,
} from '@nestjs/common';

import { Express } from 'express';
import { ProfileImagesService } from './profile_images.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/auth.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile-images')
export class ProfileImagesController {
  constructor(private readonly profileImagesService: ProfileImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  async uploadProfileImage(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    return this.profileImagesService.uploadProfileImage(user.id, file);
  }

  @Get('current')
  @Auth()
  async getCurrentProfileImage(@GetUser() user: User) {
    return this.profileImagesService.getCurrentProfileImage(user.id);
  }

  @Get('all-images/:userId')
  @Auth()
  async getImagesByUser(@Param('userId') userId: string) {
    return this.profileImagesService.getImagesByUser(userId);
  }

  @Delete(':id')
  @Auth()
  async deleteProfileImage(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) imageId: string,
  ) {
    return this.profileImagesService.deleteProfileImage(imageId);
  }
}
