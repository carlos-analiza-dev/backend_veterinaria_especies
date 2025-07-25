import { Module } from '@nestjs/common';
import { ProduccionAlternativaService } from './produccion_alternativa.service';
import { ProduccionAlternativaController } from './produccion_alternativa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduccionAlternativa } from './entities/produccion_alternativa.entity';

@Module({
  controllers: [ProduccionAlternativaController],
  imports: [TypeOrmModule.forFeature([ProduccionAlternativa])],
  providers: [ProduccionAlternativaService],
})
export class ProduccionAlternativaModule {}
