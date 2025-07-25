import { Module } from '@nestjs/common';
import { ProduccionForrajesInsumosService } from './produccion_forrajes_insumos.service';
import { ProduccionForrajesInsumosController } from './produccion_forrajes_insumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionForrajesInsumo } from './entities/produccion_forrajes_insumo.entity';

@Module({
  controllers: [ProduccionForrajesInsumosController],
  imports: [TypeOrmModule.forFeature([ProduccionForrajesInsumo])],
  providers: [ProduccionForrajesInsumosService],
})
export class ProduccionForrajesInsumosModule {}
