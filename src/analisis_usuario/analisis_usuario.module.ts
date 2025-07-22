import { Module } from '@nestjs/common';
import { AnalisisUsuarioService } from './analisis_usuario.service';
import { AnalisisUsuarioController } from './analisis_usuario.controller';

@Module({
  controllers: [AnalisisUsuarioController],
  providers: [AnalisisUsuarioService],
})
export class AnalisisUsuarioModule {}
