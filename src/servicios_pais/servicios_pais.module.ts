import { Module } from '@nestjs/common';
import { ServiciosPaisService } from './servicios_pais.service';
import { ServiciosPaisController } from './servicios_pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosPai } from './entities/servicios_pai.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { SubServicio } from 'src/sub_servicios/entities/sub_servicio.entity';

@Module({
  controllers: [ServiciosPaisController],
  imports: [TypeOrmModule.forFeature([ServiciosPai, Pai, SubServicio])],
  providers: [ServiciosPaisService],
})
export class ServiciosPaisModule {}
