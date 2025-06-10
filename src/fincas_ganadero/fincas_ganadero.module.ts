import { Module } from '@nestjs/common';
import { FincasGanaderoService } from './fincas_ganadero.service';
import { FincasGanaderoController } from './fincas_ganadero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FincasGanadero } from './entities/fincas_ganadero.entity';
import { User } from 'src/auth/entities/auth.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';
import { MunicipiosDepartamentosPai } from 'src/municipios_departamentos_pais/entities/municipios_departamentos_pai.entity';
import { Pai } from 'src/pais/entities/pai.entity';

@Module({
  controllers: [FincasGanaderoController],
  imports: [
    TypeOrmModule.forFeature([
      FincasGanadero,
      User,
      DepartamentosPai,
      MunicipiosDepartamentosPai,
      Pai,
    ]),
  ],
  providers: [FincasGanaderoService],
})
export class FincasGanaderoModule {}
