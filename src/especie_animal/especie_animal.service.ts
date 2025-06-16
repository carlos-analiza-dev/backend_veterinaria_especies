import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEspecieAnimalDto } from './dto/create-especie_animal.dto';
import { UpdateEspecieAnimalDto } from './dto/update-especie_animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecieAnimal } from './entities/especie_animal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecieAnimalService {
  constructor(
    @InjectRepository(EspecieAnimal)
    private readonly especieRepo: Repository<EspecieAnimal>,
  ) {}
  create(createEspecieAnimalDto: CreateEspecieAnimalDto) {
    return 'This action adds a new especieAnimal';
  }

  async findAll() {
    try {
      const especies = await this.especieRepo.find({});
      if (!especies || especies.length === 0)
        throw new NotFoundException(
          'No se encontraron especies disponibles en este momento',
        );
      return especies;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} especieAnimal`;
  }

  update(id: number, updateEspecieAnimalDto: UpdateEspecieAnimalDto) {
    return `This action updates a #${id} especieAnimal`;
  }

  remove(id: number) {
    return `This action removes a #${id} especieAnimal`;
  }
}
