import { Module } from '@nestjs/common';
import { ProduccionApiculturaService } from './produccion_apicultura.service';
import { ProduccionApiculturaController } from './produccion_apicultura.controller';

@Module({
  controllers: [ProduccionApiculturaController],
  providers: [ProduccionApiculturaService],
})
export class ProduccionApiculturaModule {}
