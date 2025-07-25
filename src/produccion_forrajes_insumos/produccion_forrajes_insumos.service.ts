import { Injectable } from '@nestjs/common';
import { CreateProduccionForrajesInsumoDto } from './dto/create-produccion_forrajes_insumo.dto';
import { UpdateProduccionForrajesInsumoDto } from './dto/update-produccion_forrajes_insumo.dto';

@Injectable()
export class ProduccionForrajesInsumosService {
  create(createProduccionForrajesInsumoDto: CreateProduccionForrajesInsumoDto) {
    return 'This action adds a new produccionForrajesInsumo';
  }

  findAll() {
    return `This action returns all produccionForrajesInsumos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produccionForrajesInsumo`;
  }

  update(id: number, updateProduccionForrajesInsumoDto: UpdateProduccionForrajesInsumoDto) {
    return `This action updates a #${id} produccionForrajesInsumo`;
  }

  remove(id: number) {
    return `This action removes a #${id} produccionForrajesInsumo`;
  }
}
