import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Role } from 'src/roles/entities/role.entity';
import { DepartamentosPai } from 'src/departamentos_pais/entities/departamentos_pai.entity';
import { MunicipiosDepartamentosPai } from 'src/municipios_departamentos_pais/entities/municipios_departamentos_pai.entity';
import { Pai } from 'src/pais/entities/pai.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SeedController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      User,
      Role,
      DepartamentosPai,
      MunicipiosDepartamentosPai,
      Pai,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
