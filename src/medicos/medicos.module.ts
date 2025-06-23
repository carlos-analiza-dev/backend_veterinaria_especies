import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { User } from 'src/auth/entities/auth.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Module({
  controllers: [MedicosController],
  imports: [TypeOrmModule.forFeature([Medico, User, Servicio])],
  providers: [MedicosService],
})
export class MedicosModule {}
