import { Module } from '@nestjs/common';
import { InsumosUsuarioService } from './insumos_usuario.service';
import { InsumosUsuarioController } from './insumos_usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsumosUsuario } from './entities/insumos_usuario.entity';
import { User } from 'src/auth/entities/auth.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [InsumosUsuarioController],
  imports: [TypeOrmModule.forFeature([InsumosUsuario, User]), AuthModule],
  providers: [InsumosUsuarioService],
})
export class InsumosUsuarioModule {}
