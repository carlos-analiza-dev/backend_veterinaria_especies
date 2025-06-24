import { Module } from '@nestjs/common';
import { HorariosMedicosService } from './horarios_medicos.service';
import { HorariosMedicosController } from './horarios_medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorariosMedico } from './entities/horarios_medico.entity';
import { Medico } from 'src/medicos/entities/medico.entity';

@Module({
  controllers: [HorariosMedicosController],
  imports: [TypeOrmModule.forFeature([HorariosMedico, Medico])],
  providers: [HorariosMedicosService],
})
export class HorariosMedicosModule {}
