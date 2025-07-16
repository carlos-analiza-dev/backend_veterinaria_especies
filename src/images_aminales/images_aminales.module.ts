import { Module } from '@nestjs/common';
import { ImagesAminalesService } from './images_aminales.service';
import { ImagesAminalesController } from './images_aminales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesAminale } from './entities/images_aminale.entity';
import { AnimalFinca } from 'src/animal_finca/entities/animal_finca.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ImagesAminalesController],
  imports: [
    TypeOrmModule.forFeature([ImagesAminale, AnimalFinca]),
    ConfigModule,
    AuthModule,
  ],
  providers: [ImagesAminalesService],
})
export class ImagesAminalesModule {}
