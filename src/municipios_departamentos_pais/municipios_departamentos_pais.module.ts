import { Module } from '@nestjs/common';
import { MunicipiosDepartamentosPaisService } from './municipios_departamentos_pais.service';
import { MunicipiosDepartamentosPaisController } from './municipios_departamentos_pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipiosDepartamentosPai } from './entities/municipios_departamentos_pai.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';

@Module({
  controllers: [MunicipiosDepartamentosPaisController],
  imports: [
    TypeOrmModule.forFeature([MunicipiosDepartamentosPai, DepartamentosPai]),
  ],
  providers: [MunicipiosDepartamentosPaisService],
})
export class MunicipiosDepartamentosPaisModule {}
