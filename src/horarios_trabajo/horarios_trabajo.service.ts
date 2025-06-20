import { Injectable } from '@nestjs/common';
import { CreateHorariosTrabajoDto } from './dto/create-horarios_trabajo.dto';
import { UpdateHorariosTrabajoDto } from './dto/update-horarios_trabajo.dto';

@Injectable()
export class HorariosTrabajoService {
  create(createHorariosTrabajoDto: CreateHorariosTrabajoDto) {
    return 'This action adds a new horariosTrabajo';
  }

  findAll() {
    return `This action returns all horariosTrabajo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horariosTrabajo`;
  }

  update(id: number, updateHorariosTrabajoDto: UpdateHorariosTrabajoDto) {
    return `This action updates a #${id} horariosTrabajo`;
  }

  remove(id: number) {
    return `This action removes a #${id} horariosTrabajo`;
  }
}
