import { Injectable } from '@nestjs/common';
import { CreateAnalisisUsuarioDto } from './dto/create-analisis_usuario.dto';
import { UpdateAnalisisUsuarioDto } from './dto/update-analisis_usuario.dto';

@Injectable()
export class AnalisisUsuarioService {
  create(createAnalisisUsuarioDto: CreateAnalisisUsuarioDto) {
    return 'This action adds a new analisisUsuario';
  }

  findAll() {
    return `This action returns all analisisUsuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analisisUsuario`;
  }

  update(id: number, updateAnalisisUsuarioDto: UpdateAnalisisUsuarioDto) {
    return `This action updates a #${id} analisisUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} analisisUsuario`;
  }
}
