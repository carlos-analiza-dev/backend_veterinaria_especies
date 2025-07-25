import { Module } from '@nestjs/common';
import { ProduccionAgricolaService } from './produccion_agricola.service';
import { ProduccionAgricolaController } from './produccion_agricola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionAgricola } from './entities/produccion_agricola.entity';

@Module({
  controllers: [ProduccionAgricolaController],
  imports: [TypeOrmModule.forFeature([ProduccionAgricola])],
  providers: [ProduccionAgricolaService],
})
export class ProduccionAgricolaModule {}
