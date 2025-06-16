import { Module } from '@nestjs/common';
import { RazaAnimalService } from './raza_animal.service';
import { RazaAnimalController } from './raza_animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazaAnimal } from './entities/raza_animal.entity';
import { EspecieAnimal } from 'src/especie_animal/entities/especie_animal.entity';

@Module({
  controllers: [RazaAnimalController],
  imports: [TypeOrmModule.forFeature([RazaAnimal, EspecieAnimal])],
  providers: [RazaAnimalService],
})
export class RazaAnimalModule {}
