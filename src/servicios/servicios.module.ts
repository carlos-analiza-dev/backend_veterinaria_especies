import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';

@Module({
  controllers: [ServiciosController],
  imports: [TypeOrmModule.forFeature([Servicio])],
  providers: [ServiciosService],
})
export class ServiciosModule {}
