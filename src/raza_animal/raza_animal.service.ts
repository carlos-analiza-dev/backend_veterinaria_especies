import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRazaAnimalDto } from './dto/create-raza_animal.dto';
import { UpdateRazaAnimalDto } from './dto/update-raza_animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecieAnimal } from 'src/especie_animal/entities/especie_animal.entity';
import { Repository } from 'typeorm';
import { RazaAnimal } from './entities/raza_animal.entity';

@Injectable()
export class RazaAnimalService {
  constructor(
    @InjectRepository(EspecieAnimal)
    private readonly especieRepo: Repository<EspecieAnimal>,
    @InjectRepository(RazaAnimal)
    private readonly razaRepo: Repository<RazaAnimal>,
  ) {}
  create(createRazaAnimalDto: CreateRazaAnimalDto) {
    return 'This action adds a new razaAnimal';
  }

  async findAll(id: string) {
    try {
      const especie_existe = await this.especieRepo.findOne({ where: { id } });
      if (!especie_existe)
        throw new NotFoundException('No se encontro la especie seleccionada');
      const razas_especies = await this.razaRepo.find({
        where: {
          especie: especie_existe,
        },
      });
      if (!razas_especies || razas_especies.length === 0)
        throw new NotFoundException(
          ' No se encontraron razas disponibles en este momento',
        );
      return razas_especies;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} razaAnimal`;
  }

  update(id: number, updateRazaAnimalDto: UpdateRazaAnimalDto) {
    return `This action updates a #${id} razaAnimal`;
  }

  remove(id: number) {
    return `This action removes a #${id} razaAnimal`;
  }
}
