import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PaisModule } from './pais/pais.module';
import { MailModule } from './mail/mail.module';
import { CommonModule } from './common/common.module';
import { DepartamentosPaisModule } from './departamentos_pais/departamentos_pais.module';
import { MunicipiosDepartamentosPaisModule } from './municipios_departamentos_pais/municipios_departamentos_pais.module';
import { ServiciosPaisModule } from './servicios_pais/servicios_pais.module';
import { ServiciosModule } from './servicios/servicios.module';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    PaisModule,
    MailModule,
    CommonModule,
    DepartamentosPaisModule,
    MunicipiosDepartamentosPaisModule,
    ServiciosPaisModule,
    ServiciosModule,
    RolesModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
