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
import { EspecieAnimal } from 'src/especie_animal/entities/especie_animal.entity';
import { RazaAnimal } from 'src/raza_animal/entities/raza_animal.entity';

@Injectable()
export class AnimalFincaService {
  constructor(
    @InjectRepository(AnimalFinca)
    private readonly animalRepo: Repository<AnimalFinca>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(FincasGanadero)
    private readonly fincaRepo: Repository<FincasGanadero>,
    @InjectRepository(EspecieAnimal)
    private readonly especieAnimal: Repository<EspecieAnimal>,
    @InjectRepository(RazaAnimal)
    private readonly razaAnimal: Repository<RazaAnimal>,
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
      tipo_alimentacion,
      castrado,
      esterelizado,
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

      const especie_animal = await this.especieAnimal.findOneBy({
        id: especie,
      });
      if (!especie_animal) {
        throw new NotFoundException(`Especie no encontrada`);
      }

      const raza_animal = await this.razaAnimal.findOneBy({ id: raza });
      if (!raza_animal) {
        throw new NotFoundException(`Raza no encontrada`);
      }

      const nuevoAnimal = this.animalRepo.create({
        color,
        especie: especie_animal,
        identificador,
        raza: raza_animal,
        sexo,
        edad_promedio,
        fecha_nacimiento,
        observaciones,
        propietario,
        finca,
        castrado,
        esterelizado,
        tipo_alimentacion,
      });

      await this.animalRepo.save(nuevoAnimal);

      return 'Animal creado exitosamente';
    } catch (error) {
      throw error;
    }
  }

  async findAll(propietarioId: string, paginationDto: PaginationDto) {
    const { fincaId, identificador } = paginationDto;

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

      if (identificador && identificador.trim() !== '') {
        query.andWhere('LOWER(animal.identificador) LIKE :identificador', {
          identificador: `%${identificador.toLowerCase()}%`,
        });
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
