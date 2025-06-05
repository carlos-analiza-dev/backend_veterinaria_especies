import { Module } from '@nestjs/common';
import { DepartamentosPaisService } from './departamentos_pais.service';
import { DepartamentosPaisController } from './departamentos_pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentosPai } from './entities/departamentos_pai.entity';
import { Pai } from 'src/pais/entities/pai.entity';

@Module({
  controllers: [DepartamentosPaisController],
  imports: [TypeOrmModule.forFeature([DepartamentosPai, Pai])],
  providers: [DepartamentosPaisService],
})
export class DepartamentosPaisModule {}
