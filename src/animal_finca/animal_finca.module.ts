import { Module } from '@nestjs/common';
import { AnimalFincaService } from './animal_finca.service';
import { AnimalFincaController } from './animal_finca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { User } from 'src/auth/entities/auth.entity';
import { AnimalFinca } from './entities/animal_finca.entity';

@Module({
  controllers: [AnimalFincaController],
  imports: [TypeOrmModule.forFeature([AnimalFinca, FincasGanadero, User])],
  providers: [AnimalFincaService],
})
export class AnimalFincaModule {}
