import { Module } from '@nestjs/common';
import { SubServiciosService } from './sub_servicios.service';
import { SubServiciosController } from './sub_servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubServicio } from './entities/sub_servicio.entity';
import { ServiciosPai } from 'src/servicios_pais/entities/servicios_pai.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Module({
  controllers: [SubServiciosController],
  imports: [TypeOrmModule.forFeature([SubServicio, Servicio])],
  providers: [SubServiciosService],
})
export class SubServiciosModule {}
