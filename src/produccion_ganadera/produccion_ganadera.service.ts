import { Injectable } from '@nestjs/common';

import { UpdateProduccionGanaderaDto } from './dto/update-produccion_ganadera.dto';
import { ProduccionGanaderaDto } from './dto/create-produccion_ganadera.dto';

@Injectable()
export class ProduccionGanaderaService {
  create(createProduccionGanaderaDto: ProduccionGanaderaDto) {
    return 'This action adds a new produccionGanadera';
  }

  findAll() {
    return `This action returns all produccionGanadera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produccionGanadera`;
  }

  update(id: number, updateProduccionGanaderaDto: UpdateProduccionGanaderaDto) {
    return `This action updates a #${id} produccionGanadera`;
  }

  remove(id: number) {
    return `This action removes a #${id} produccionGanadera`;
  }
}
