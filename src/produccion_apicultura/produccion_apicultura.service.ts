import { Injectable } from '@nestjs/common';
import { CreateProduccionApiculturaDto } from './dto/create-produccion_apicultura.dto';
import { UpdateProduccionApiculturaDto } from './dto/update-produccion_apicultura.dto';

@Injectable()
export class ProduccionApiculturaService {
  create(createProduccionApiculturaDto: CreateProduccionApiculturaDto) {
    return 'This action adds a new produccionApicultura';
  }

  findAll() {
    return `This action returns all produccionApicultura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produccionApicultura`;
  }

  update(id: number, updateProduccionApiculturaDto: UpdateProduccionApiculturaDto) {
    return `This action updates a #${id} produccionApicultura`;
  }

  remove(id: number) {
    return `This action removes a #${id} produccionApicultura`;
  }
}
