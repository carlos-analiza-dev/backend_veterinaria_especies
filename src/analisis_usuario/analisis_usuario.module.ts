import { Module } from '@nestjs/common';
import { AnalisisUsuarioService } from './analisis_usuario.service';
import { AnalisisUsuarioController } from './analisis_usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalisisEficiencia } from './entities/analisis_usuario.entity';
import { User } from 'src/auth/entities/auth.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AnalisisUsuarioController],
  imports: [TypeOrmModule.forFeature([AnalisisEficiencia, User]), AuthModule],
  providers: [AnalisisUsuarioService],
})
export class AnalisisUsuarioModule {}
