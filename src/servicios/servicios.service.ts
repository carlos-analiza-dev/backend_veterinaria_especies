import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepo: Repository<Servicio>,
  ) {}
  async create(createServicioDto: CreateServicioDto) {
    const { nombre, descripcion } = createServicioDto;

    const servicio_nuevo = this.servicioRepo.create({
      descripcion,
      nombre,
    });

    await this.servicioRepo.save(servicio_nuevo);
    return 'Servicio Creado exitosamente';
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    try {
      const [servicios, total] = await this.servicioRepo.findAndCount({
        skip: offset,
        take: limit,
      });
      if (!servicios || servicios.length === 0) {
        throw new NotFoundException(
          'No se encontraron servicios en este momento.',
        );
      }
      return { servicios, total };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const servicio = await this.servicioRepo.findOne({ where: { id } });
      if (!servicio)
        throw new BadRequestException('No se encontro el servicio.');
      return servicio;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateServicioDto: UpdateServicioDto) {
    try {
      const servicio = await this.servicioRepo.preload({
        id,
        ...updateServicioDto,
      });

      if (!servicio) {
        throw new NotFoundException(`No se encontró el servicio con id: ${id}`);
      }

      await this.servicioRepo.save(servicio);

      return {
        message: 'Servicio actualizado exitosamente',
        servicio,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Ocurrió un error al actualizar el servicio',
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} servicio`;
  }
}
