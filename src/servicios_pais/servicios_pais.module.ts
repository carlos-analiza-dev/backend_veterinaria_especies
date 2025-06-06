import { Module } from '@nestjs/common';
import { ServiciosPaisService } from './servicios_pais.service';
import { ServiciosPaisController } from './servicios_pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosPai } from './entities/servicios_pai.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Module({
  controllers: [ServiciosPaisController],
  imports: [TypeOrmModule.forFeature([ServiciosPai, Pai, Servicio])],
  providers: [ServiciosPaisService],
})
export class ServiciosPaisModule {}
