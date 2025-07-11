import {
  BadRequestException,
  ConflictException,
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
      fecha_nacimiento,
      observaciones,
      tipo_alimentacion,
      castrado,
      esterelizado,
      complementos,
      medicamento,
      nombre_padre,
      arete_padre,
      raza_padre,
      nombre_criador_padre,
      nombre_propietario_padre,
      nombre_finca_origen_padre,
      compra_padre,
      nombre_criador_origen_padre,
      nombre_madre,
      arete_madre,
      raza_madre,
      nombre_criador_madre,
      nombre_propietario_madre,
      nombre_finca_origen_madre,
      numero_parto_madre,
      compra_madre,
      nombre_criador_origen_madre,
      pureza,
      tipo_reproduccion,
    } = createAnimalFincaDto;

    try {
      const propietario = await this.userRepo.findOneBy({ id: propietarioId });
      if (!propietario) {
        throw new NotFoundException(`Propietario no encontrado`);
      }

      const finca = await this.fincaRepo.findOne({
        where: { id: fincaId },
        relations: ['animales', 'animales.especie'],
      });
      if (!finca) {
        throw new NotFoundException(`Finca no encontrada`);
      }

      const especie_animal = await this.especieAnimal.findOneBy({
        id: especie,
      });
      if (!especie_animal) {
        throw new NotFoundException(`Especie no encontrada`);
      }

      if (finca.especies_maneja && finca.especies_maneja.length > 0) {
        const configEspecie = finca.especies_maneja.find(
          (e) => e.especie === especie_animal.nombre,
        );

        if (configEspecie) {
          const animalesExistentes = finca.animales.filter(
            (a) => a.especie.id === especie,
          ).length;

          if (animalesExistentes >= configEspecie.cantidad) {
            throw new ConflictException(
              `No se pueden agregar más animales de la especie ${especie_animal.nombre}. ` +
                `Límite en finca seleccionada: ${configEspecie.cantidad}`,
            );
          }
        } else {
          throw new BadRequestException(
            `La especie ${especie_animal.nombre} no está configurada para esta finca`,
          );
        }
      }

      const raza_animal = await this.razaAnimal.findOneBy({ id: raza });
      if (!raza_animal) {
        throw new NotFoundException(`Raza no encontrada`);
      }

      const existeIdentificador = await this.animalRepo.findOneBy({
        identificador,
      });
      if (existeIdentificador) {
        throw new ConflictException('El identificador ya está en uso');
      }

      let edadCalculada: number | null = null;

      if (fecha_nacimiento) {
        const nacimiento = new Date(fecha_nacimiento);
        const hoy = new Date();

        const años = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        const dia = hoy.getDate() - nacimiento.getDate();

        if (mes < 0 || (mes === 0 && dia < 0)) {
          edadCalculada = años - 1;
        } else {
          edadCalculada = años;
        }
      }

      const nuevoAnimal = this.animalRepo.create({
        color,
        especie: especie_animal,
        identificador,
        raza: raza_animal,
        sexo,
        edad_promedio: edadCalculada,
        fecha_nacimiento,
        observaciones,
        propietario,
        finca,
        castrado,
        esterelizado,
        tipo_alimentacion,
        complementos,
        medicamento,
        pureza,
        tipo_reproduccion,
        nombre_padre,
        arete_padre,
        raza_padre,
        nombre_criador_padre,
        nombre_propietario_padre,
        nombre_finca_origen_padre,
        compra_padre,
        nombre_criador_origen_padre,
        arete_madre,
        nombre_criador_madre,
        nombre_criador_origen_madre,
        compra_madre,
        nombre_finca_origen_madre,
        nombre_madre,
        nombre_propietario_madre,
        numero_parto_madre,
        raza_madre,
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
        .leftJoinAndSelect('animal.especie', 'especie')
        .leftJoinAndSelect('animal.raza', 'raza')
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

  async findAllAnimalesByFincaRaza(
    fincaId: string,
    especieId: string,
    razaId: string,
  ) {
    try {
      const animales = await this.animalRepo
        .createQueryBuilder('animal')
        .leftJoinAndSelect('animal.finca', 'finca')
        .leftJoinAndSelect('animal.especie', 'especie')
        .leftJoinAndSelect('animal.raza', 'raza')
        .leftJoinAndSelect('animal.propietario', 'propietario')
        .where('finca.id = :fincaId', { fincaId })
        .andWhere('especie.id = :especieId', { especieId })
        .andWhere('raza.id = :razaId', { razaId })
        .orderBy('animal.fecha_registro', 'DESC')
        .getMany();

      if (animales.length === 0) {
        throw new NotFoundException(
          'No se encontraron animales en este momento.',
        );
      }

      return animales;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const animal = await this.animalRepo.findOne({ where: { id } });
      if (!animal)
        throw new NotFoundException('No se encontro el animal seleccionado');
      return animal;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAnimalFincaDto: UpdateAnimalFincaDto) {
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
      medicamento,
      complementos,
      pureza,
      tipo_reproduccion,

      nombre_padre,
      arete_padre,
      raza_padre,
      nombre_criador_padre,
      nombre_propietario_padre,
      nombre_finca_origen_padre,
      compra_padre,
      nombre_criador_origen_padre,

      nombre_madre,
      arete_madre,
      raza_madre,
      nombre_criador_madre,
      nombre_propietario_madre,
      nombre_finca_origen_madre,
      numero_parto_madre,
      compra_madre,
      nombre_criador_origen_madre,
    } = updateAnimalFincaDto;

    const animal = await this.animalRepo.findOne({
      where: { id },
      relations: ['especie', 'raza', 'finca', 'propietario'],
    });

    if (!animal) {
      throw new NotFoundException(`Animal con ID ${id} no encontrado`);
    }

    if (especie) {
      const especie_animal = await this.especieAnimal.findOneBy({
        id: especie,
      });
      if (!especie_animal) {
        throw new NotFoundException(`Especie con ID ${especie} no encontrada`);
      }
      animal.especie = especie_animal;
    }

    if (raza) {
      const raza_animal = await this.razaAnimal.findOneBy({ id: raza });
      if (!raza_animal) {
        throw new NotFoundException(`Raza con ID ${raza} no encontrada`);
      }
      animal.raza = raza_animal;
    }

    if (fincaId) {
      const finca = await this.fincaRepo.findOneBy({ id: fincaId });
      if (!finca) {
        throw new NotFoundException(`Finca con ID ${fincaId} no encontrada`);
      }
      animal.finca = finca;
    }

    if (propietarioId) {
      const propietario = await this.userRepo.findOneBy({ id: propietarioId });
      if (!propietario) {
        throw new NotFoundException(
          `Propietario con ID ${propietarioId} no encontrado`,
        );
      }
      animal.propietario = propietario;
    }

    if (color !== undefined) animal.color = color;
    if (sexo !== undefined) animal.sexo = sexo;
    if (identificador !== undefined) animal.identificador = identificador;
    if (edad_promedio !== undefined) animal.edad_promedio = edad_promedio;

    if (fecha_nacimiento !== undefined) {
      let edadCalculada: number | null = null;

      if (fecha_nacimiento) {
        const nacimiento = new Date(fecha_nacimiento);
        const hoy = new Date();

        const años = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        const dia = hoy.getDate() - nacimiento.getDate();

        if (mes < 0 || (mes === 0 && dia < 0)) {
          edadCalculada = años - 1;
        } else {
          edadCalculada = años;
        }
      }

      const fecha = new Date(fecha_nacimiento);
      if (isNaN(fecha.getTime())) {
        throw new BadRequestException('Fecha de nacimiento inválida');
      }
      animal.fecha_nacimiento = fecha;
      animal.edad_promedio = edadCalculada;
    }

    const tieneAlgunAlimento =
      Array.isArray(tipo_alimentacion) && tipo_alimentacion.length > 0;

    if (!tieneAlgunAlimento) {
      throw new BadRequestException(
        'Debe ingresar al menos un tipo de alimento',
      );
    }

    if (observaciones !== undefined) animal.observaciones = observaciones;
    if (medicamento !== undefined) animal.medicamento = medicamento;
    if (tipo_alimentacion !== undefined)
      animal.tipo_alimentacion = tipo_alimentacion;
    if (complementos !== undefined) animal.complementos = complementos;
    if (castrado !== undefined) animal.castrado = castrado;
    if (esterelizado !== undefined) animal.esterelizado = esterelizado;

    if (nombre_padre !== undefined) animal.nombre_padre = nombre_padre;
    if (arete_padre !== undefined) animal.arete_padre = arete_padre;
    if (raza_padre !== undefined) animal.raza_padre = raza_padre;
    if (nombre_criador_padre !== undefined)
      animal.nombre_criador_padre = nombre_criador_padre;
    if (nombre_propietario_padre !== undefined)
      animal.nombre_propietario_padre = nombre_propietario_padre;
    if (nombre_finca_origen_padre !== undefined)
      animal.nombre_finca_origen_padre = nombre_finca_origen_padre;
    if (compra_padre !== undefined) animal.compra_padre = compra_padre;
    if (nombre_criador_origen_padre !== undefined)
      animal.nombre_criador_origen_padre = nombre_criador_origen_padre;

    if (nombre_madre !== undefined) animal.nombre_madre = nombre_madre;
    if (arete_madre !== undefined) animal.arete_madre = arete_madre;
    if (raza_madre !== undefined) animal.raza_madre = raza_madre;
    if (nombre_criador_madre !== undefined)
      animal.nombre_criador_madre = nombre_criador_madre;
    if (nombre_propietario_madre !== undefined)
      animal.nombre_propietario_madre = nombre_propietario_madre;
    if (nombre_finca_origen_madre !== undefined)
      animal.nombre_finca_origen_madre = nombre_finca_origen_madre;
    if (numero_parto_madre !== undefined)
      animal.numero_parto_madre = numero_parto_madre;
    if (compra_madre !== undefined) animal.compra_madre = compra_madre;
    if (nombre_criador_origen_madre !== undefined)
      animal.nombre_criador_origen_madre = nombre_criador_origen_madre;
    if (pureza !== undefined) animal.pureza = pureza;
    if (tipo_reproduccion !== undefined) animal.pureza = pureza;

    await this.animalRepo.save(animal);

    return {
      message: 'Animal actualizado correctamente',
      animal: instanceToPlain(animal),
    };
  }

  remove(id: number) {
    return `This action removes a #${id} animalFinca`;
  }
}
