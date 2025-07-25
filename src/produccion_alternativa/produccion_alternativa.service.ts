import { Injectable } from '@nestjs/common';
import { CreateProduccionAlternativaDto } from './dto/create-produccion_alternativa.dto';
import { UpdateProduccionAlternativaDto } from './dto/update-produccion_alternativa.dto';

@Injectable()
export class ProduccionAlternativaService {
  create(createProduccionAlternativaDto: CreateProduccionAlternativaDto) {
    return 'This action adds a new produccionAlternativa';
  }

  findAll() {
    return `This action returns all produccionAlternativa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produccionAlternativa`;
  }

  update(id: number, updateProduccionAlternativaDto: UpdateProduccionAlternativaDto) {
    return `This action updates a #${id} produccionAlternativa`;
  }

  remove(id: number) {
    return `This action removes a #${id} produccionAlternativa`;
  }
}
