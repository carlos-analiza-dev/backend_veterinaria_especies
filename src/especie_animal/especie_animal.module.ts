import { Module } from '@nestjs/common';
import { EspecieAnimalService } from './especie_animal.service';
import { EspecieAnimalController } from './especie_animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecieAnimal } from './entities/especie_animal.entity';

@Module({
  controllers: [EspecieAnimalController],
  imports: [TypeOrmModule.forFeature([EspecieAnimal])],
  providers: [EspecieAnimalService],
})
export class EspecieAnimalModule {}
