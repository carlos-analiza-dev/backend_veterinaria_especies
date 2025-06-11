import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalFincaDto } from './dto/create-animal_finca.dto';
import { UpdateAnimalFincaDto } from './dto/update-animal_finca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalFinca } from './entities/animal_finca.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { FincasGanadero } from 'src/fincas_ganadero/entities/fincas_ganadero.entity';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AnimalFincaService {
  constructor(
    @InjectRepository(AnimalFinca)
    private readonly animalRepo: Repository<AnimalFinca>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(FincasGanadero)
    private readonly fincaRepo: Repository<FincasGanadero>,
  ) {}
  async create(createAnimalFincaDto: CreateAnimalFincaDto) {
    const {
      color,
      especie,
      fincaId,
      identificador,
      propietarioId,
      raza,
      sexo,
      edad_promedio,
      fecha_nacimiento,
      observaciones,
    } = createAnimalFincaDto;

    try {
      const propietario = await this.userRepo.findOneBy({ id: propietarioId });
      if (!propietario) {
        throw new NotFoundException(`Propietario no encontrado`);
      }

      const finca = await this.fincaRepo.findOneBy({ id: fincaId });
      if (!finca) {
        throw new NotFoundException(`Finca no encontrada`);
      }

      const nuevoAnimal = this.animalRepo.create({
        color,
        especie,
        identificador,
        raza,
        sexo,
        edad_promedio,
        fecha_nacimiento,
        observaciones,
        propietario,
        finca,
      });

      await this.animalRepo.save(nuevoAnimal);

      return 'Animal creado exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll(propietarioId: string, paginationDto: PaginationDto) {
    const { fincaId } = paginationDto;

    try {
      const propietario = await this.userRepo.findOne({
        where: { id: propietarioId },
      });

      if (!propietario) {
        throw new NotFoundException(
          'No se encontró el propietario seleccionado.',
        );
      }

      const query = this.animalRepo
        .createQueryBuilder('animal')
        .leftJoinAndSelect('animal.finca', 'finca')
        .leftJoinAndSelect('animal.propietario', 'propietario')
        .where('animal.propietario = :propietarioId', { propietarioId });

      if (fincaId) {
        query.andWhere('animal.finca = :fincaId', { fincaId });
      }

      const animales = await query.getMany();

      if (!animales || animales.length === 0) {
        throw new BadRequestException(
          'No se encontraron animales en este momento',
        );
      }

      return instanceToPlain(animales);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} animalFinca`;
  }

  update(id: number, updateAnimalFincaDto: UpdateAnimalFincaDto) {
    return `This action updates a #${id} animalFinca`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalFinca`;
  }
}
