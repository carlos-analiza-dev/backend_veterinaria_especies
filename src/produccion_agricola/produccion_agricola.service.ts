import { Injectable } from '@nestjs/common';
import { CreateProduccionAgricolaDto } from './dto/create-produccion_agricola.dto';
import { UpdateProduccionAgricolaDto } from './dto/update-produccion_agricola.dto';

@Injectable()
export class ProduccionAgricolaService {
  create(createProduccionAgricolaDto: CreateProduccionAgricolaDto) {
    return 'This action adds a new produccionAgricola';
  }

  findAll() {
    return `This action returns all produccionAgricola`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produccionAgricola`;
  }

  update(id: number, updateProduccionAgricolaDto: UpdateProduccionAgricolaDto) {
    return `This action updates a #${id} produccionAgricola`;
  }

  remove(id: number) {
    return `This action removes a #${id} produccionAgricola`;
  }
}
