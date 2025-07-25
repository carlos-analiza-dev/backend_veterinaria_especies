import { Module } from '@nestjs/common';
import { ProduccionGanaderaService } from './produccion_ganadera.service';
import { ProduccionGanaderaController } from './produccion_ganadera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionGanadera } from './entities/produccion_ganadera.entity';

@Module({
  controllers: [ProduccionGanaderaController],
  imports: [TypeOrmModule.forFeature([ProduccionGanadera])],
  providers: [ProduccionGanaderaService],
})
export class ProduccionGanaderaModule {}
