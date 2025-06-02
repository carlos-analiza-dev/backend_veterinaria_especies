import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaiDto } from './dto/create-pai.dto';
import { UpdatePaiDto } from './dto/update-pai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pai } from './entities/pai.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisService {
  constructor(
    @InjectRepository(Pai)
    private readonly paisRepo: Repository<Pai>,
  ) {}
  async create(createPaiDto: CreatePaiDto) {
    const { nombre } = createPaiDto;

    const pais = this.paisRepo.create({
      nombre,
    });
    await this.paisRepo.save(pais);
    return 'Pais Creado Exitosamente';
  }

  async findAll() {
    try {
      const paises = await this.paisRepo.find({});
      if (!paises || paises.length === 0)
        throw new NotFoundException(
          'No se encontraron paises en estos momentos.',
        );

      return paises;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pai`;
  }

  update(id: number, updatePaiDto: UpdatePaiDto) {
    return `This action updates a #${id} pai`;
  }

  remove(id: number) {
    return `This action removes a #${id} pai`;
  }
}
